// Imports
import React from 'react'
import PropTypes from 'prop-types'

// UI Imports
import { withStyles } from '@material-ui/core/styles/index'
import styles from './styles'

// App Imports

// Component
const AlignCenterMiddle = (props) => {
  const { classes, children } = props

  return(
    <div className={classes.root}>
      { children }
    </div>
  )
}

// Component Properties
AlignCenterMiddle.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(AlignCenterMiddle)

