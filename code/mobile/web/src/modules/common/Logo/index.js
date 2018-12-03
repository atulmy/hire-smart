// Imports
import React from 'react'
import PropTypes from 'prop-types'

// UI Imports
import Typography from '@material-ui/core/Typography/Typography'
import { withStyles } from '@material-ui/core/styles/index'
import styles from './styles'

// Component
const Logo = ({ size = 'h6', classes }) => (
  <Typography variant={size} className={classes.title}>
    <span>Hire<span className={classes.titleHighlight}>Smart</span></span>
  </Typography>
)

// Component Properties
Logo.propTypes = {
  size: PropTypes.string,
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Logo)

