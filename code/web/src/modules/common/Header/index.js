// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'

// UI Imports
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Tooltip from 'material-ui/Tooltip'
import IconButton from 'material-ui/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import IconAccountCircle from '@material-ui/icons/AccountCircle'
import IconPlaylistAddCheck from '@material-ui/icons/PlaylistAddCheck'
import IconCall from '@material-ui/icons/Call'
import { withStyles } from 'material-ui/styles'
import styles from './styles'

// App Imports
import { routes } from '../../../setup/routes'

// Component
class Header extends PureComponent {
  isNotHomePage = () => {
    const { location } = this.props

    return location.pathname !== routes.home.path
  }

  render() {
    const { classes } = this.props

    return (
      <AppBar elevation={this.isNotHomePage() ? 1 : 0}>
        <Toolbar>
          {/* Menu */}
          <Tooltip title={'Menu'} placement={'bottom'}>
            <IconButton className={classes.menu} color={'inherit'} aria-label={'Menu'}>
              <MenuIcon />
            </IconButton>
          </Tooltip>

          {/* Logo */}
          <Typography variant={'title'} color={'inherit'} className={classes.title}>
            <Link to={routes.home.path}>
              { this.isNotHomePage() && <span>Hire<span className={classes.titleHighlight}>Smart</span></span> }
            </Link>
          </Typography>

          {/* Call */}
          <Link to={routes.contact.path}>
            <Tooltip title={'Get in touch'} placement={'bottom'}>
              <IconButton color={'inherit'}>
                <IconCall />
              </IconButton>
            </Tooltip>
          </Link>

          {/* Features */}
          <Link to={routes.features.path}>
            <Tooltip title={'Check out features'} placement={'bottom'}>
              <IconButton color={'inherit'}>
                <IconPlaylistAddCheck />
              </IconButton>
            </Tooltip>
          </Link>

          {/* Account */}
          <Link to={routes.account.path}>
            <Tooltip title={'Account'} placement={'bottom'}>
              <IconButton color={'inherit'} className={classes.account}>
                <IconAccountCircle />
              </IconButton>
            </Tooltip>
          </Link>
        </Toolbar>
      </AppBar>
    )
  }
}

// Component Properties
Header.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withRouter(withStyles(styles)(Header))
