// Imports
import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// App Imports
import routes from '../../setup/routes'

// Component
const AuthCheckAccess = (props) => (
  props.user.isAuthenticated ? <Redirect to={routes.dashboard.path}/> : ''
)

// Component Properties
AuthCheckAccess.propTypes = {
  user: PropTypes.object.isRequired
}

// Component State
function authCheckAccessState(state) {
  return {
    user: state.user
  }
}

export default connect(authCheckAccessState, {})(AuthCheckAccess)
