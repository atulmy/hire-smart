// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// UI Imports
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListSubheader from '@material-ui/core/ListSubheader'
import Avatar from '@material-ui/core/Avatar'
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'

// App Imports
import { getList as getProjectsList, dashboardSet } from '../../../project/api/actions/query'
import { avatarColor, avatarLetter } from '../../../../setup/helpers'
import Loading from '../../../common/Loading'
import EmptyMessage from '../../../common/EmptyMessage'

// Component
class ProjectList extends PureComponent {
  componentDidMount() {
    this.refreshProjectsList()
  }

  refreshProjectsList = (isLoading = true) => {
    const { getProjectsList } = this.props

    getProjectsList(isLoading)
  }

  onSelectProject = project => () => {
    const { dashboardSet } = this.props

    dashboardSet(project)
  }

  selected = (id) => {
    const { projectDashboard: { project } } = this.props

    return project && project._id === id
  }

  render() {
    const { classes, projects } = this.props

    return (
      <List
        component={'nav'}
        subheader={<ListSubheader component={'div'} className={classes.title}>Projects</ListSubheader>}
      >
        {
          projects.isLoading
            ? <Loading message={'loading projects..'} />
            : projects.list && projects.list.length > 0
                ? projects.list.map(item => (
                    <ListItem
                      key={item._id}
                      onClick={this.onSelectProject(item)}
                      button
                      style={ this.selected(item._id)  ? { backgroundColor: '#ddd' } : {}}
                    >
                      <ListItemAvatar>
                        <Avatar style={ this.selected(item._id) ? { backgroundColor: avatarColor(item.name) } : {}}>{ avatarLetter(item.name) }</Avatar>
                      </ListItemAvatar>

                      <ListItemText primary={item.name} secondary={''} />
                    </ListItem>
                  ))
                : <EmptyMessage message={'You have not added any project yet.'} />
        }
      </List>
    )
  }
}

// Component Properties
ProjectList.propTypes = {
  classes: PropTypes.object.isRequired,
  projects: PropTypes.object.isRequired,
  getProjectsList: PropTypes.func.isRequired,
  dashboardSet: PropTypes.func.isRequired
}

// Component State
function projectListState(state) {
  return {
    projects: state.projects,
    projectDashboard: state.projectDashboard
  }
}

export default connect(projectListState, { getProjectsList, dashboardSet })(withStyles(styles)(ProjectList))
