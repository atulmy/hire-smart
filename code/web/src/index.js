// Imports
import path from 'path'
import { Server } from 'http'
import Express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter, matchPath } from 'react-router-dom'
import { Helmet } from "react-helmet"
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

// UI Imports
import { SheetsRegistry } from 'react-jss/lib/jss';
import JssProvider from 'react-jss/lib/JssProvider';
import { MuiThemeProvider, createMuiTheme, createGenerateClassName } from 'material-ui/styles';
import { green, red } from 'material-ui/colors';

// App Imports
import { APP_URL, NODE_ENV, PORT } from './setup/config/env'
import { rootReducer } from './setup/store'
import { routes } from './setup/routes'
import { setUser } from './modules/user/api/actions'
import App from './setup/client/App'
import view from './setup/server/view'

// Create new server
const app = new Express()
const server = new Server(app)

// Request body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Request body cookie parser
app.use(cookieParser())

// Public (static) files folder
app.use(Express.static(path.join(__dirname, '..', 'public')))

// Store (new store for each request)
const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
)

// Match any Route
app.get('*', (request, response) => {

  // Check for auth
  if (request.cookies.auth) {
    const auth = JSON.parse(request.cookies.auth)

    if (auth && auth.token !== '' && auth.user) {
      store.dispatch(setUser(auth.token, auth.user))
    }
  }

  // HTTP status code
  let status = 200

  const matches = Object.values(routes).reduce((matches, route) => {
    const match = matchPath(request.url, typeof route.path === 'function' ? route.path() : route.path, route)

    if (match && match.isExact) {
      matches.push({
        route,
        match,
        promise: route.component.fetchData ? route.component.fetchData({
          store,
          params: match.params
        }) : Promise.resolve(null)
      })
    }
    return matches
  }, [])

  // No such route, send 404 status
  if (matches.length === 0) {
    status = 404
  }

  // Any AJAX calls inside components
  const promises = matches.map((match) => {
    return match.promise
  })

  // Resolve the AJAX calls and render
  Promise.all(promises)
    .then((...data) => {
      const initialState = store.getState()
      const context = {}

      if (context.url) {
        response.redirect(context.url)
      } else {
        // Create a sheetsRegistry instance.
        const sheetsRegistry = new SheetsRegistry();
        // Create a theme instance.
        const theme = createMuiTheme({
          palette: {
            primary: green,
            accent: red,
            type: 'light',
          },
        });
        const generateClassName = createGenerateClassName();
        const appHtml = renderToString(
          <Provider store={store} key="provider">
            <StaticRouter context={context} location={request.url}>
              <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
                <MuiThemeProvider theme={theme} sheetsManager={new Map()}>
                  <App />
                </MuiThemeProvider>
              </JssProvider>
            </StaticRouter>
          </Provider>
        )
        const css = sheetsRegistry.toString()

        // Get Meta header tags
        const helmet = Helmet.renderStatic()

        const styles = ''

        let html = view(APP_URL, NODE_ENV, helmet, appHtml, css, initialState)

        // Reset the state on server
        store.dispatch({
          type: 'RESET'
        })

        // Finally send generated HTML with initial data to the client
        return response.status(status).send(html)
      }
    })
    .catch(error => {
      console.error(error)
    })
})

// Start Server
server.listen(PORT, (error) => {
  if (error) {
    return console.error(error)
  } else {
    return console.info(`Server running on http://localhost:${ PORT } [${ NODE_ENV }]`)
  }
})
