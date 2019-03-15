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
import { getListByProject } from '../../../interview/api/actions/query'
import { view, viewHide, edit, editClose, remind } from '../../../interview/api/actions/mutation'
import Loading from '../../../common/Loading'
import CreateOrEdit from '../../../interview/Manage/CreateOrEdit'
import ListTable from '../../../interview/Manage/List/ListTable'
import View from '../../../interview/Manage/View'

// Component
class Interviews extends PureComponent {

  constructor(props) {
    super(props)

    this.state = {
      drawerAdd: false
    }
  }

  componentDidMount() {
    const { editClose } = this.props

    editClose()

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

  edit = interview => () => {
    const { edit } = this.props

    edit(interview)

    this.toggleDrawer(true)()
  }

  view = interview => () => {
    const { view } = this.props

    view(interview)
  }

  remind = interview => async () => {
    const { user, messageShow, remind } = this.props

    if(user.isAuthenticated && user.details.demo) {
      messageShow('Sorry, to perform this action you need to verify your account.')
    } else {
      let check = window.confirm('Are you sure you want to send reminder email to the candidate and interviewer?')

      if (check) {
        messageShow('Sending reminder emails, please wait..')

        try {
          const {data} = await remind({id: interview._id})

          if (data.errors && data.errors.length > 0) {
            messageShow(data.errors[0].message)
          } else {
            messageShow('Reminder emails sent successfully.')
          }
        } catch (error) {
          messageShow('There was some error. Please try again.')
        }
      }
    }
  }

  render() {
    const { classes, projectDashboard: { project }, interviewsByProject: { isLoading, list }, interviewView, viewHide } = this.props
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

        {/* Candidate list */}
        {
          isLoading
            ? <Loading />
            : <Fade in={true}>
                <ListTable
                  list={list}
                  view={this.view}
                  edit={this.edit}
                  remind={this.remind}
                />
              </Fade>
        }

        {/* Candidate view */}
        <Drawer
          anchor={'right'}
          open={interviewView.open}
          onClose={viewHide}
          ModalProps={{
            BackdropProps: {
              classes: { root: classes.backdrop }
            }
          }}
        >
          <div className={classes.drawer}>
            { <View /> }
          </div>
        </Drawer>

        {/* Candidate create or edit */}
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
              successCallback={this.successCallback}
            />
          </div>
        </Drawer>
      </div>
    )
  }
}

// Component Properties
Interviews.propTypes = {
  classes: PropTypes.object.isRequired,
  interviewsByProject: PropTypes.object.isRequired,
  interviewView: PropTypes.object.isRequired,
  projectDashboard: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  getListByProject: PropTypes.func.isRequired,
  view: PropTypes.func.isRequired,
  viewHide: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  editClose: PropTypes.func.isRequired,
  remind: PropTypes.func.isRequired,
  messageShow: PropTypes.func.isRequired
}

// Component State
function interviewsState(state) {
  return {
    interviewsByProject: state.interviewsByProject,
    interviewView: state.interviewView,
    projectDashboard: state.projectDashboard,
    user: state.user
  }
}

export default connect(interviewsState, { getListByProject, view, viewHide, edit, editClose, remind, messageShow })(withStyles(styles)(Interviews))
