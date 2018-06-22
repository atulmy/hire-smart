// Imports
import React from 'react'
import PropTypes from 'prop-types'

// UI Imports
import { withStyles } from '@material-ui/core/styles/index'
import styles from './styles'

// App Imports

// Component
const Demo = (props) => (
  <div>
    <h1>Demo</h1>
  </div>
)

// Component Properties
Demo.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Demo)

