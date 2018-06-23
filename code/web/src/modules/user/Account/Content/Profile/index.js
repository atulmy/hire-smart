// Imports
import React from 'react'
import PropTypes from 'prop-types'

// UI Imports
import Fade from '@material-ui/core/Fade'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles/index'
import styles from './styles'

// App Imports

// Component
const Profile = (props) => {
  const { classes } = props

  return (
    <Fade in={true}>
      <div>
        {/* Toolbar - Heading */}
        <Toolbar className={classes.toolbar}>
          <Typography
            variant={'body2'}
            color={'inherit'}
            className={classes.title}
          >
            Your Account
          </Typography>
        </Toolbar>

      </div>
    </Fade>
  )
}

// Component Properties
Profile.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Profile)

