// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// UI Imports
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import IconCached from '@material-ui/icons/Cached'
import Fade from '@material-ui/core/Fade'
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'

// App Imports
import { getListByProject } from '../../../activity/api/actions/query'
import Loading from '../../../common/Loading'
import EmptyMessage from '../../../common/EmptyMessage'
import ListTable from '../../../activity/Manage/List/ListTable'

// Component
class Activities extends PureComponent {
  constructor() {
    super()

    this.state = {
      drawerAdd: false
    }
  }

  componentDidMount() {
    this.refresh()
  }

  refresh = (isLoading = true, forceRefresh = false) => {
    const { getListByProject, projectDashboard: { project } } = this.props

    getListByProject({ projectId: project._id }, isLoading, forceRefresh)
  }

  render() {
    const { classes, activitiesByProject: { isLoading, list }, user } = this.props

    return (
      <div className={classes.root}>
        {/* Actions */}
        <div className={classes.actions}>
          <Button onClick={() => this.refresh(true, true)}>
            <IconCached className={classes.actionIcon} />
            Refresh
          </Button>
        </div>

        <Divider />

        {/* Activities list */}
        {
          user.details.demo
            ? <p><EmptyMessage message={'Sorry, to view activities you need to verify your account.'} /></p>
            : isLoading
                ? <Loading />
                : <Fade in={true}>
                    <ListTable list={list} />
                  </Fade>
        }
      </div>
    )
  }
}

// Component Properties
Activities.propTypes = {
  classes: PropTypes.object.isRequired,
  activitiesByProject: PropTypes.object.isRequired,
  projectDashboard: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  getListByProject: PropTypes.func.isRequired
}

// Component State
function jobsState(state) {
  return {
    activitiesByProject: state.activitiesByProject,
    projectDashboard: state.projectDashboard,
    user: state.user
  }
}

export default connect(jobsState, { getListByProject })(withStyles(styles)(Activities))
