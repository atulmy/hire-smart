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
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Drawer from '@material-ui/core/Drawer'
import Tooltip from '@material-ui/core/Tooltip'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import IconMenu from '@material-ui/icons/Menu'
import IconAccountCircle from '@material-ui/icons/AccountCircle'
import IconPlaylistAddCheck from '@material-ui/icons/PlaylistAddCheck'
import IconCall from '@material-ui/icons/Call'
import IconDashboard from '@material-ui/icons/Dashboard'
import IconSupervisorAccount from '@material-ui/icons/SupervisorAccount'
import IconAccountBalance from '@material-ui/icons/AccountBalance'
import IconDomain from '@material-ui/icons/DomainOutlined'
import IconPersonAdd from '@material-ui/icons/PersonAdd'
import IconThumbsUpDown from '@material-ui/icons/ThumbsUpDown'
import IconErrorOutline from '@material-ui/icons/ErrorOutline'
import IconUpdate from '@material-ui/icons/Update'
import blue from '@material-ui/core/colors/blue'
import orange from '@material-ui/core/colors/orange'
import pink from '@material-ui/core/colors/pink'
import green from '@material-ui/core/colors/green'
import purple from '@material-ui/core/colors/purple'
import teal from '@material-ui/core/colors/teal'
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'

// App Imports
import { NODE_ENV } from '../../../setup/config/env'
import params from '../../../setup/config/params'
import routes from '../../../setup/routes'
import { drawerShow, drawerHide } from '../api/actions'

// Component
class Header extends PureComponent {
  isNotHomePage = () => {
    const { location } = this.props

    return location.pathname !== routes.home.path
  }

  account = () => {
    const { user } = this.props

    if(user.isAuthenticated) {
      if(user.details.demo) {
        return routes.account.child.demo.path
      }

      return routes.account.path
    }

    return routes.login.path
  }

  render() {
    const { classes, common: { drawerVisible }, user, drawerShow, drawerHide } = this.props

    return (
      <React.Fragment>
        {/* Top bar */}
        <AppBar elevation={0}>
          <Toolbar>
            {/* Menu */}
            <IconButton
              onClick={drawerShow}
              className={classes.menu}
              color={'inherit'}
              aria-label={'Menu'}
            >
              <IconMenu />
            </IconButton>

            {/* Logo */}
            <Typography variant={'h6'} color={'inherit'} className={classes.title}>
              <Link to={user.isAuthenticated ? routes.dashboard.path : routes.home.path}>
                { this.isNotHomePage() && <span>Hire<span className={classes.titleHighlight}>Smart</span></span> }
              </Link>
            </Typography>

            {/* Demo Message */}
            {
              user.isAuthenticated && user.details.demo &&
              <Link to={routes.account.child.demo.path}>
                <Tooltip
                  title={'You are using a demo account. Verify your account to enable all features and avoid losing your data.'}
                  placement={'bottom'}
                  classes={{
                    tooltip: classes.tooltip
                  }}
                >
                  <Button
                    variant={'contained'}
                    className={classes.button}
                  >
                    <IconErrorOutline className={classes.buttonIcon} />
                    Verify Your Account
                  </Button>
                </Tooltip>
              </Link>
            }

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
              <Tooltip title={'Features'} placement={'bottom'}>
                <IconButton color={'inherit'}>
                  <IconPlaylistAddCheck />
                </IconButton>
              </Tooltip>
            </Link>

            {/* Account */}
            <Link to={this.account()}>
              <Tooltip title={user.isAuthenticated ? 'Your Account' : 'Login or signup'} placement={'bottom'}>
                <IconButton color={'inherit'} className={classes.account}>
                  <IconAccountCircle />
                </IconButton>
              </Tooltip>
            </Link>
          </Toolbar>
        </AppBar>

        {/* Drawer */}
        <Drawer
          open={drawerVisible}
          onClose={drawerHide}
          ModalProps={{
            BackdropProps: {
              classes: { root: classes.backdrop }
            }
          }}
        >
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
                    subheader={<ListSubheader component={'div'}>{ user.details.name }</ListSubheader>}
                  >
                    <Link to={routes.dashboard.path}>
                      <ListItem button>
                        <ListItemAvatar>
                          <Avatar style={{ backgroundColor: blue[500] }}><IconDashboard /></Avatar>
                        </ListItemAvatar>

                        <ListItemText primary={'Dashboard'} secondary={'Birds eye view'} />
                      </ListItem>
                    </Link>

                    {
                      !user.details.demo &&
                      <Link to={routes.activity.path}>
                        <ListItem button>
                          <ListItemAvatar>
                            <Avatar style={{ backgroundColor: orange[500] }}><IconUpdate /></Avatar>
                          </ListItemAvatar>

                          <ListItemText primary={'Activities'} secondary={'View all activities'} />
                        </ListItem>
                      </Link>
                    }

                    <Link to={routes.candidate.path}>
                      <ListItem button>
                        <ListItemAvatar>
                          <Avatar style={{ backgroundColor: pink[500] }}><IconSupervisorAccount /></Avatar>
                        </ListItemAvatar>

                        <ListItemText primary={'Candidates'} secondary={'Manage all candidates'} />
                      </ListItem>
                    </Link>

                    <Link to={routes.interviewer.path}>
                      <ListItem button>
                        <ListItemAvatar>
                          <Avatar style={{ backgroundColor: teal[500] }}><IconThumbsUpDown /></Avatar>
                        </ListItemAvatar>

                        <ListItemText primary={'Interviewers'} secondary={'Manage all interviewers'} />
                      </ListItem>
                    </Link>

                    <Link to={routes.project.path}>
                      <ListItem button>
                        <ListItemAvatar>
                          <Avatar style={{ backgroundColor: purple[500] }}><IconDomain /></Avatar>
                        </ListItemAvatar>

                        <ListItemText primary={'Projects'} secondary={'Manage all projects'} />
                      </ListItem>
                    </Link>

                    <Link to={routes.organization.path}>
                      <ListItem button>
                        <ListItemAvatar>
                          <Avatar style={{ backgroundColor: green[500] }}><IconAccountBalance /></Avatar>
                        </ListItemAvatar>

                        <ListItemText primary={'Organization'} secondary={'Manage your organization'} />
                      </ListItem>
                    </Link>
                  </List>
                : <List
                    component={'nav'}
                    subheader={<ListSubheader component={'div'}>{ params.site.name }</ListSubheader>}
                  >
                    <Link to={routes.login.path}>
                      <ListItem button>
                        <ListItemAvatar>
                          <Avatar style={{ backgroundColor: green[500] }}><IconPersonAdd /></Avatar>
                        </ListItemAvatar>

                        <ListItemText primary={'Login or Signup'} />
                      </ListItem>
                    </Link>
                  </List>
            }
          </div>
        </Drawer>

        {/* Drawer activator */}
        {
          NODE_ENV !== 'development1' &&
          <div
            onMouseOver={drawerShow}
            className={classes.drawerActivator}
          />
        }
      </React.Fragment>
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
