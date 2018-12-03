// Imports
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'

// UI Imports
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import IconArrowBack from '@material-ui/icons/ArrowBack'
import IconAccountCircle from '@material-ui/icons/AccountCircle'
import IconPhone from '@material-ui/icons/Phone'

import { withStyles } from '@material-ui/core/styles'
import styles from './styles'

// App Imports
import routes from '../../../setup/routes'
import Logo from '../Logo'

// Component
class Header extends Component {
  render () {
    const { classes, title = 'logo', auth: { isAuthenticated } } = this.props

    return (
      <div className={classes.root}>
        <AppBar position="static" elevation={2}>
          <Toolbar>
            <IconButton style={{ marginLeft: -12 }} color="inherit" aria-label="Back">
              <IconArrowBack />
            </IconButton>

              {
                title === 'logo'
                  ? <div className={classes.title}><Logo /></div>
                  : <Typography variant="button" color="inherit" className={classes.title}>{ title }</Typography>
              }

            {
              isAuthenticated
                ? <Link to={routes.userProfile.path}>
                    <IconButton style={{ marginLeft: -12 }} color="inherit" aria-label="Back">
                      <IconAccountCircle />
                    </IconButton>
                  </Link>
                : <Link to={routes.pagesContact.path}>
                    <IconButton style={{ marginLeft: -12 }} color="inherit" aria-label="Back">
                      <IconPhone />
                    </IconButton>
                  </Link>
            }
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

// Component Properties
Header.propTypes = {
  auth: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
}

// Component State
function headerState (state) {
  return {
    auth: state.auth
  }
}

export default withRouter(connect(headerState, {})(withStyles(styles)(Header)))
