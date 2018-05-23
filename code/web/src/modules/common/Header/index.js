// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

// UI Imports
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListSubheader from '@material-ui/core/ListSubheader'
import ListItemText from '@material-ui/core/ListItemText'
import Drawer from '@material-ui/core/Drawer'
import Tooltip from '@material-ui/core/Tooltip'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import IconMenu from '@material-ui/icons/Menu'
import IconAccountCircle from '@material-ui/icons/AccountCircle'
import IconPlaylistAddCheck from '@material-ui/icons/PlaylistAddCheck'
import IconCall from '@material-ui/icons/Call'
import IconDashboard from '@material-ui/icons/Dashboard'
import IconSupervisorAccount from '@material-ui/icons/SupervisorAccount'
import IconAccountBalance from '@material-ui/icons/AccountBalance'
import IconDomain from '@material-ui/icons/Domain'
import IconPerson from '@material-ui/icons/Person'
import IconPersonAdd from '@material-ui/icons/PersonAdd'
import blue from '@material-ui/core/colors/blue'
import pink from '@material-ui/core/colors/pink'
import green from '@material-ui/core/colors/green'
import purple from '@material-ui/core/colors/purple'
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'

// App Imports
import routes from '../../../setup/routes'
import { drawerShow, drawerHide } from '../api/actions'

// Component
class Header extends PureComponent {
  isNotHomePage = () => {
    const { location } = this.props

    return location.pathname !== routes.home.path
  }

  render() {
    const { classes, common: { drawerVisible }, user, drawerShow, drawerHide } = this.props

    return (
      <div>
        {/* Top bar */}
        <AppBar elevation={0}>
          <Toolbar>
            {/* Menu */}
            <Tooltip title={'Menu'} placement={'bottom'}>
              <IconButton
                onClick={drawerShow}
                className={classes.menu}
                color={'inherit'}
                aria-label={'Menu'}
              >
                <IconMenu />
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

        {/* Drawer */}
        <Drawer open={drawerVisible} onClose={drawerHide}>
          <div
            tabIndex={0}
            role={'button'}
            onClick={drawerHide}
            onKeyDown={drawerHide}
          >
            {
              user.isAuthenticated
                ? <List
                    component={'nav'}
                    subheader={<ListSubheader component="div">{ user.details.name }</ListSubheader>}
                  >
                    <Link to={routes.dashboard.path}>
                      <ListItem button>
                        <Avatar style={{ backgroundColor: blue[500] }}><IconDashboard /></Avatar>
                        <ListItemText primary={'Dashboard'} secondary={'Birds eye view'} />
                      </ListItem>
                    </Link>

                    <ListItem button>
                      <Avatar style={{ backgroundColor: pink[500] }}><IconSupervisorAccount /></Avatar>
                      <ListItemText primary={'Candidates'} secondary={'Manage all candidates'} />
                    </ListItem>

                    <ListItem button>
                      <Avatar style={{ backgroundColor: purple[500] }}><IconDomain /></Avatar>
                      <ListItemText primary={'Clients'} secondary={'Manage all clients'} />
                    </ListItem>

                    <ListItem button>
                      <Avatar style={{ backgroundColor: green[500] }}><IconAccountBalance /></Avatar>
                      <ListItemText primary={'Organization'} secondary={'Manage your organization'} />
                    </ListItem>
                  </List>
                : <List component={'nav'}>
                    <ListItem button>
                      <Avatar style={{ backgroundColor: pink[500] }}><IconPerson /></Avatar>
                      <ListItemText primary={'Login'} />
                    </ListItem>

                    <ListItem button>
                      <Avatar style={{ backgroundColor: green[500] }}><IconPersonAdd /></Avatar>
                      <ListItemText primary={'Signup'} />
                    </ListItem>
                  </List>
            }
          </div>
        </Drawer>
      </div>
    )
  }
}

// Component Properties
Header.propTypes = {
  classes: PropTypes.object.isRequired,
  common: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  drawerShow: PropTypes.func.isRequired,
  drawerHide: PropTypes.func.isRequired
}

// Component State
function headerState(state) {
  return {
    common: state.common,
    user: state.user
  }
}

export default withRouter(connect(headerState, { drawerShow, drawerHide })(withStyles(styles)(Header)))
