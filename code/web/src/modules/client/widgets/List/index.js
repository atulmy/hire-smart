// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// UI Imports
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListSubheader from '@material-ui/core/ListSubheader'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'

// App Imports
import { getList as getClientsList, get as getClient } from '../../../client/api/actions/query'
import { avatarColor, avatarLetter } from '../../../../setup/helpers'
import Loading from '../../../common/Loading'
import EmptyMessage from '../../../common/EmptyMessage'

// Component
class ClientList extends PureComponent {
  componentDidMount() {
    this.refreshClientsList()
  }

  refreshClientsList = (isLoading = true) => {
    const { getClientsList } = this.props

    getClientsList(isLoading)
  }

  onSelectClient = clientId => () => {
    const { getClient } = this.props

    getClient(clientId)
  }

  selected = (id) => {
    const { client: { item } } = this.props

    return item._id === id
  }

  render() {
    const { classes, clients } = this.props

    return (
      <List
        component={'nav'}
        subheader={<ListSubheader component={'div'} className={classes.title}>Clients</ListSubheader>}
      >
        {
          clients.isLoading
            ? <Loading message={'loading clients..'} />
            : clients.list && clients.list.length > 0
                ? clients.list.map(item => (
                    <ListItem
                      key={item._id}
                      onClick={this.onSelectClient(item._id)}
                      button
                      style={ this.selected(item._id)  ? { backgroundColor: '#ddd' } : {}}
                    >
                      <Avatar style={ this.selected(item._id) ? { backgroundColor: avatarColor(item.name) } : {}}>{ avatarLetter(item.name) }</Avatar>

                      <ListItemText primary={item.name} secondary={'10 candidates'} />
                    </ListItem>
                  ))
                : <EmptyMessage message={'You have not added any client yet.'} />
        }
      </List>
    )
  }
}

// Component Properties
ClientList.propTypes = {
  classes: PropTypes.object.isRequired,
  clients: PropTypes.object.isRequired,
  getClientsList: PropTypes.func.isRequired,
  getClient: PropTypes.func.isRequired
}

// Component State
function clientListState(state) {
  return {
    clients: state.clients,
    client: state.client,
  }
}

export default connect(clientListState, { getClientsList, getClient })(withStyles(styles)(ClientList))
