// Imports
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

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
import { footerSelection } from '../../../modules/common/api/actions'

const routeMap = {
  dashboard: routes.userDashboard.path,
  profile: routes.userProfile.path,
}

// Component
class Footer extends Component {

  onChange = (event, value) => {
    const { history, footerSelection } = this.props

    history.push(routeMap[value])

    footerSelection(value)
  }

  render () {
    const { common: { footer }, classes } = this.props

    return (
      <Paper id="footer" elevation={4} className={classes.root}>
        <BottomNavigation
          value={footer}
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
  common: PropTypes.object.isRequired,
  footerSelection: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
}

// Component State
function footerState(state) {
  return {
    common: state.common
  }
}

export default connect(footerState, { footerSelection })(withRouter(withStyles(styles)(Footer)))
