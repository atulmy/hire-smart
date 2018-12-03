// Imports
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'

// UI Imports
import Paper from '@material-ui/core/Paper'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import RestoreIcon from '@material-ui/icons/Restore'
import FavoriteIcon from '@material-ui/icons/Favorite'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'

// App Imports
import routes from '../../../setup/routes'
import params from '../../../setup/config/params'
import { messageShow } from '../api/actions'
import { logout } from '../../user/api/actions/query'

// Component
class Footer extends Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };


  render () {
    const { classes, auth: { isAuthenticated, details } } = this.props
    const { value } = this.state

    return (
      <Paper elevation={4} className={classes.root}>
        <BottomNavigation
          value={value}
          onChange={this.handleChange}
          showLabels
        >
          <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
          <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
          <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
        </BottomNavigation>
      </Paper>
    )
  }
}

// Component Properties
Footer.propTypes = {
  auth: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  messageShow: PropTypes.func.isRequired
}

// Component State
function footerState (state) {
  return {
    auth: state.auth
  }
}

export default withRouter(connect(footerState, { logout, messageShow })(withStyles(styles)(Footer)))
