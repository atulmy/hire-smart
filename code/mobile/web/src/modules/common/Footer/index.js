// Imports
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {  withRouter } from 'react-router-dom'

// UI Imports
import Paper from '@material-ui/core/Paper'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import IconDashboard from '@material-ui/icons/Dashboard'
import IconAccountCircle from '@material-ui/icons/AccountCircle'
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'

// App Imports
import routes from '../../../setup/routes'

// Component
class Footer extends Component {
  state = {
    value: 'dashboard'
  }

  onChange = (event, value) => {
    const routeMap = {
      dashboard: routes.userDashboard.path,
      profile: routes.userProfile.path,
    }

    const { history } = this.props

    this.setState({ value }, () => {

      history.push(routeMap[value])
    })

    console.log(value)


  }

  render () {
    const { classes } = this.props
    const { value } = this.state

    return (
      <Paper elevation={4} className={classes.root}>
        <BottomNavigation
          value={value}
          onChange={this.onChange}
          showLabels
        >
          <BottomNavigationAction
            label="Dashboard"
            value="dashboard"
            icon={<IconDashboard />}
          />

          <BottomNavigationAction
            label="Profile"
            value="profile"
            icon={<IconAccountCircle />}
          />
        </BottomNavigation>
      </Paper>
    )
  }
}

// Component Properties
Footer.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withRouter(withStyles(styles)(Footer))
