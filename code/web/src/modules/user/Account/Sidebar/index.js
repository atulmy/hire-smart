// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

// UI Imports
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListSubheader from '@material-ui/core/ListSubheader'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import IconError from '@material-ui/icons/Error'
import InboxPerson from '@material-ui/icons/Person'
import InboxExitToApp from '@material-ui/icons/ExitToApp'
import grey from '@material-ui/core/colors/grey'
import red from '@material-ui/core/colors/red'
import green from '@material-ui/core/colors/green'
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'

// App Imports
import params from '../../../../setup/config/params'
import routes from '../../../../setup/routes'
import { messageShow } from '../../../common/api/actions'
import { logout } from '../../api/actions/mutation'

// Component
class Sidebar extends PureComponent {
  isActiveMenu = (path) => {
    const { location } = this.props

    return location.pathname === path
  }

  onLogout = () => {
    const { user } = this.props

    window.setTimeout(() => {
      let message = `Are you sure you want to log out of ${ params.site.name }?`

      if(user.isAuthenticated && user.details.demo) {
        message = `Since you are using a demo account, all your data will be lost. Are you sure you want to log out?`
      }

      let check = window.confirm(message)

      if(check) {
        const {logout, messageShow} = this.props

        logout()

        messageShow('You have been logged out successfully.')
      }
    }, 300)
  }

  render() {
    const { classes, user } = this.props

    return (
      <div className={classes.sidebar}>
        <List
          component={'nav'}
          subheader={<ListSubheader component={'div'} className={classes.title}>Account</ListSubheader>}
        >
          {
            user.isAuthenticated && user.details.demo
              ? <Link to={routes.account.child.demo.path}>
                  <ListItem button style={ this.isActiveMenu(routes.account.child.demo.path)  ? { backgroundColor: grey[300] } : {}}>
                    <ListItemAvatar>
                      <Avatar style={ this.isActiveMenu(routes.account.child.demo.path) ? { backgroundColor: red[500] } : {}}>
                        <IconError />
                      </Avatar>
                    </ListItemAvatar>

                    <ListItemText primary={'Demo Account'} />
                  </ListItem>
                </Link>
              : <Link to={routes.account.path}>
                  <ListItem button style={ this.isActiveMenu(routes.account.path)  ? { backgroundColor: grey[300] } : {}}>
                    <ListItemAvatar>
                      <Avatar style={ this.isActiveMenu(routes.account.path) ? { backgroundColor: green[500] } : {}}>
                        <InboxPerson />
                      </Avatar>
                    </ListItemAvatar>

                    <ListItemText primary={'My Profile'} />
                  </ListItem>
                </Link>
          }

          <ListItem button onClick={this.onLogout}>
            <ListItemAvatar>
              <Avatar><InboxExitToApp /></Avatar>
            </ListItemAvatar>

            <ListItemText primary={'Logout'} />
          </ListItem>
        </List>
      </div>
    )
  }
}

// Component Properties
Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  messageShow: PropTypes.func.isRequired
}

// Component State
function sidebarState(state) {
  return {
    user: state.user
  }
}

export default withRouter(connect(sidebarState, { logout, messageShow })(withStyles(styles)(Sidebar)))
