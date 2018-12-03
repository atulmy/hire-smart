// Imports
import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// App Imports
import routes from '../../setup/routes'

// Component
const AuthCheck = ({ auth: { isAuthenticated } }) => (
  isAuthenticated
    ? <Redirect to={routes.userDashboard.path} />
    : ''
)

// Component Properties
AuthCheck.propTypes = {
  auth: PropTypes.object.isRequired
}

// Component State
function authCheckState(state) {
  return {
    auth: state.auth
  }
}

export default connect(authCheckState, {})(AuthCheck)
