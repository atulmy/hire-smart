// Imports
import React from 'react'
import PropTypes from 'prop-types'

// UI Imports
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

import { withStyles } from '@material-ui/core/styles'
import styles from './styles'

// App Imports
import Logo from '../Logo'

// Component
const Header = ({ classes, title = 'logo', leftIcon = null, rightIcon = null }) => (
  <div className={classes.root}>
    <AppBar position="static" elevation={2}>
      <Toolbar>
        { leftIcon }

        <div className={classes.title}>
          {
            title === 'logo'
              ? <Logo />
              : <Typography variant="h6" color="inherit">{ title }</Typography>
          }
        </div>

        { rightIcon }
      </Toolbar>
    </AppBar>
  </div>
)

// Component Properties
Header.propTypes = {
  title: PropTypes.string,
  leftIcon: PropTypes.any,
  rightIcon: PropTypes.any,
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Header)
