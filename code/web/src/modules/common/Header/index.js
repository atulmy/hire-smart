// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'

// UI Imports
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import IconAccountCircle from '@material-ui/icons/AccountCircle'
import IconInfo from '@material-ui/icons/Info'
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
          <IconButton className={classes.menu} color={'inherit'} aria-label={'Menu'}>
            <MenuIcon />
          </IconButton>

          {/* Logo */}
          <Typography variant={'title'} color={'inherit'} className={classes.title}>
            <Link to={routes.home.path}>
              { this.isNotHomePage() && <span>Hire<span className={classes.titleHighlight}>Smart</span></span> }
            </Link>
          </Typography>

          {/* Call */}
          <Link to={routes.contact.path}>
            <IconButton color={'inherit'}>
              <IconCall />
            </IconButton>
          </Link>

          {/* Features */}
          <Link to={routes.features.path}>
            <IconButton color={'inherit'}>
              <IconInfo />
            </IconButton>
          </Link>

          {/* Account */}
          <Link to={routes.home.path}>
            <IconButton color={'inherit'} className={classes.account}>
              <IconAccountCircle />
            </IconButton>
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
