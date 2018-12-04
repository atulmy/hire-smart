// Imports
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

// UI Imports
import { withStyles } from '@material-ui/core/styles/index'
import styles from './styles'

// App Imports
import Footer from '../Footer'

// Component
const Layout = ({ auth: { isAuthenticated }, classes, children }) => (
  <div
    id="layout"
    className={classes.root}
  >
    { children }

    { isAuthenticated && <Footer /> }
  </div>
)

// Component Properties
Layout.propTypes = {
  auth: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
}

// Component State
function layoutState(state) {
  return {
    auth: state.auth
  }
}

export default withRouter(connect(layoutState, {})(withStyles(styles)(Layout)))
