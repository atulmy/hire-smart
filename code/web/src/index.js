// Imports
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { isMobile } from 'react-device-detect'

// App Imports
import { store } from './setup/store'
import { setUser, loginSetUserLocalStorage } from './modules/user/api/actions/mutation'
import ScrollToTop from './modules/common/ScrollToTop'
import App from './setup/client/App'
import AppMobile from './setup/client/AppMobile'
import * as serviceWorker from './serviceWorker'

// User Authentication
const token = window.localStorage.getItem('token')
if (token && token !== 'undefined' && token !== '') {
  const user = JSON.parse(window.localStorage.getItem('user'))
  if (user) {
    // Dispatch action
    store.dispatch(setUser(token, user))

    loginSetUserLocalStorage(token, user)
  }
}

// App
const Root = () => (
  <Provider store={store} key={'provider'}>
    <Router>
      <ScrollToTop>
        {
          isMobile
            ? <AppMobile />
            : <App />
        }
      </ScrollToTop>
    </Router>
  </Provider>
)

// Mount project app
ReactDOM.render(
  <Root/>,
  document.getElementById('root')
)

// Service Worker
serviceWorker.unregister()
