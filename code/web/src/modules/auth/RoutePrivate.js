// Imports
import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

// App Imports
import routes from '../../setup/routes'

// Component
const RoutePrivate = (props) => (
  props.user.isAuthenticated
    ? props.role
        ? props.user.details.role === props.role
          ? <Route {...props} component={props.component} />
          : <Redirect to={routes.home.path} />
        : <Route {...props} component={props.component} />
    : <Redirect to={routes.home.path} />
)

// Component Properties
RoutePrivate.propTypes = {
  user: PropTypes.object.isRequired
}

// Component State
function routePrivateState(state) {
  return {
    user: state.user
  }
}

export default connect(routePrivateState, {})(RoutePrivate)
