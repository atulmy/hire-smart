// Imports
import React from 'react'
import PropTypes from 'prop-types'

// UI Imports
import grey from '@material-ui/core/colors/grey'
import blue from '@material-ui/core/colors/blue'
import { withStyles } from '@material-ui/core/styles/index'
import styles from './styles'

// Component
const Layout = ({ background, classes, children }) => (
  <div
    id="layout"
    className={classes.root}
    style={{ background: background === 'primary' ? blue[500] : grey[50] }}
  >
    { children }
  </div>
)

// Component Properties
Layout.propTypes = {
  background: PropTypes.string,
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Layout)
