// Imports
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'

// UI Imports
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListSubheader from '@material-ui/core/ListSubheader'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'

// App Imports
import params from '../../../setup/config/params'
import { avatarLetter, avatarColor } from '../../../setup/helpers'
import { getList } from '../../client/api/actions'
import Loading from '../../common/Loading'

// Component
class Dashboard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      tab: 'overview'
    }
  }

  componentDidMount() {
    const { getList } = this.props

    getList()
  }

  tabSwitch = (event, tab) => {
    this.setState({ tab })
  }

  render() {
    const { classes, clients } = this.props
    const { tab } = this.state

    return(
      <div className={classes.root}>
        {/* Meta tags */}
        <Helmet>
          <title>Dashboard - { params.site.name }</title>
        </Helmet>

        <div className={classes.sidebar}>
          <List
            component="nav"
            subheader={<ListSubheader component={'div'} className={classes.sidebarTitle}>Clients</ListSubheader>}
          >
            {
              clients.isLoading
                ? <Loading message={'loading clients..'} />
                : clients.list.length > 0
                    ? clients.list.map(client => (
                        <ListItem button /*style={{ backgroundColor: '#ddd' }}*/>
                          <Avatar style={{ backgroundColor: avatarColor(client.name) }}>{ avatarLetter(client.name) }</Avatar>
                          <ListItemText primary={client.name} secondary={'10 candidates'} />
                        </ListItem>
                      ))
                    : <p>No clients</p>
            }
          </List>
        </div>

        <div className={classes.content}>
          <div className={classes.tabsContainer}>
            <Tabs
              value={tab}
              onChange={this.tabSwitch}
            >
              <Tab label={'Overview'} value={'overview'} />
              <Tab label={'Interviews'} value={'interviews'} />
              <Tab label={'Candidates'} value={'candidates'} />
              <Tab label={'Panel'} value={'panel'} />
            </Tabs>
          </div>

          <div className={classes.contentInner}>
            {
              {
                overview: <span>Overview</span>,

                interviews: <span>Interviews</span>,

                candidates: <span>Candidates</span>,

                panel: <span>Panel</span>,
              }[tab]
            }
          </div>
        </div>
      </div>
    )
  }
}
// Component Properties
Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  getList: PropTypes.func.isRequired
}

// Component State
function dashboardState(state) {
  return {
    clients: state.clients
  }
}

export default connect(dashboardState, { getList })(withStyles(styles)(Dashboard))
