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
import { getListByProject } from '../../../candidate/api/actions/query'
import { view, viewHide, edit, editClose } from '../../../candidate/api/actions/mutation'
import Loading from '../../../common/Loading'
import CreateOrEdit from '../../../candidate/Manage/CreateOrEdit'
import View from '../../../candidate/Manage/View'
import ListTable from '../../../candidate/Manage/List/ListTable'

// Component
class Candidates extends PureComponent {
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
    this.refresh(false, false)

    this.toggleDrawer(false)()
  }

  add = () => {
    const { editClose } = this.props

    editClose()

    this.toggleDrawer(true)()
  }

  edit = candidate => () => {
    const { edit } = this.props

    edit(candidate)

    this.toggleDrawer(true)()
  }

  view = candidate => () => {
    const { view } = this.props

    view(candidate)
  }

  render() {
    const { classes, projectDashboard: { project },  candidatesByProject: { isLoading, list }, candidateView, viewHide } = this.props
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
                  showProject={false}
                />
              </Fade>
        }

        {/* Candidate view */}
        <Drawer
          anchor={'right'}
          open={candidateView.open}
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
Candidates.propTypes = {
  classes: PropTypes.object.isRequired,
  candidatesByProject: PropTypes.object.isRequired,
  projectDashboard: PropTypes.object.isRequired,
  candidateView: PropTypes.object.isRequired,
  getListByProject: PropTypes.func.isRequired,
  view: PropTypes.func.isRequired,
  viewHide: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  editClose: PropTypes.func.isRequired,
  messageShow: PropTypes.func.isRequired
}

// Component State
function candidatesState(state) {
  return {
    candidatesByProject: state.candidatesByProject,
    projectDashboard: state.projectDashboard,
    candidateView: state.candidateView
  }
}

export default connect(candidatesState, { getListByProject, view, viewHide, edit, editClose, messageShow })(withStyles(styles)(Candidates))
