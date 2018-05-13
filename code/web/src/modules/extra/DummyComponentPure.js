// Imports
import React from 'react'
import PropTypes from 'prop-types'

// UI Imports
import { withStyles } from 'material-ui/styles/index'
import styles from './styles'

// App Imports

// Component
const DummyComponentPure = () => (
  <div>
    <h1>Dummy Component Pure</h1>
  </div>
)

// Component Properties
DummyComponentPure.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(DummyComponentPure)

