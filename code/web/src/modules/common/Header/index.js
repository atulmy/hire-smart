// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

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

// Component
class Header extends PureComponent {
  render() {
    const { classes } = this.props

    return (
      <AppBar elevation={0}>
        <Toolbar>
          <IconButton className={classes.menu} color={'inherit'} aria-label={'Menu'}>
            <MenuIcon />
          </IconButton>

          <Typography variant={'title'} color={'inherit'} className={classes.flex} />

          <IconButton color={'inherit'}>
            <IconCall />
          </IconButton>

          <IconButton color={'inherit'}>
            <IconInfo />
          </IconButton>

          <IconButton color={'inherit'} className={classes.account}>
            <IconAccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
    )
  }
}

// Component Properties
Header.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Header)
