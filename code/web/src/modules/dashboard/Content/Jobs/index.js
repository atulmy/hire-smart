// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// UI Imports
import Drawer from '@material-ui/core/Drawer'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import IconAdd from '@material-ui/icons/Add'
import IconCached from '@material-ui/icons/Cached'
import Fade from '@material-ui/core/Fade'
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'

// App Imports
import { messageShow } from '../../../common/api/actions'
import { getListByProject } from '../../../job/api/actions/query'
import { edit, editClose } from '../../../job/api/actions/mutation'
import Loading from '../../../common/Loading'
import CreateOrEdit from '../../../job/Manage/CreateOrEdit'
import ListTable from '../../../job/Manage/List/ListTable'

// Component
class Jobs extends PureComponent {
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

  toggleDrawer = (open) => () => {
    this.setState({
      drawerAdd: open
    })
  }

  successCallback = () => {
    this.refresh(false)

    this.toggleDrawer(false)()
  }

  add = () => {
    const { editClose } = this.props

    editClose()

    this.toggleDrawer(true)()
  }

  edit = interviewer => () => {
    const { edit } = this.props

    edit(interviewer)

    this.toggleDrawer(true)()
  }

  render() {
    const { classes, projectDashboard: { project }, jobsByProject: { isLoading, list } } = this.props
    const { drawerAdd } = this.state

    return (
      <div className={classes.root}>
        {/* Actions */}
        <div className={classes.actions}>
          <Button onClick={this.add}>
            <IconAdd className={classes.actionIcon} />
            Add
          </Button>

          <Button onClick={() => this.refresh(true, true)}>
            <IconCached className={classes.actionIcon} />
            Refresh
          </Button>
        </div>

        <Divider />

        {/* Job list */}
        {
          isLoading
            ? <Loading />
            : <Fade in={true}>
                <ListTable list={list} edit={this.edit} />
              </Fade>
        }

        {/* Job create or edit */}
        <Drawer
          anchor={'right'}
          open={drawerAdd}
          onClose={this.toggleDrawer(false)}
          ModalProps={{
            BackdropProps: {
              classes: { root: classes.backdrop }
            }
          }}
        >
          <div className={classes.drawer}>
            <CreateOrEdit
              elevation={0}
              projectId={project._id}
              projectShowLoading={false}
              successCallback={this.successCallback}
              projectSelectionHide={true}
            />
          </div>
        </Drawer>
      </div>
    )
  }
}

// Component Properties
Jobs.propTypes = {
  classes: PropTypes.object.isRequired,
  jobsByProject: PropTypes.object.isRequired,
  projectDashboard: PropTypes.object.isRequired,
  getListByProject: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  editClose: PropTypes.func.isRequired,
  messageShow: PropTypes.func.isRequired
}

// Component State
function jobsState(state) {
  return {
    jobsByProject: state.jobsByProject,
    projectDashboard: state.projectDashboard
  }
}

export default connect(jobsState, { getListByProject, edit, editClose, messageShow })(withStyles(styles)(Jobs))
