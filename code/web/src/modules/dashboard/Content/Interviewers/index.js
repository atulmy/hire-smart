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
import { getListByClient } from '../../../interviewer/api/actions/query'
import { edit, editClose } from '../../../interviewer/api/actions/mutation'
import Loading from '../../../common/Loading'
import CreateOrEdit from '../../../interviewer/Manage/CreateOrEdit'
import ListTable from '../../../interviewer/Manage/List/ListTable'

// Component
class Interviewers extends PureComponent {
  constructor() {
    super()

    this.state = {
      drawerAdd: false
    }
  }

  componentDidMount() {
    this.refresh()
  }

  refresh = (isLoading = true) => {
    const { getListByClient, clientDashboard: { client } } = this.props

    getListByClient({ clientId: client._id }, isLoading)
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
    const { classes, clientDashboard: { client }, interviewersByClient: { isLoading, list } } = this.props
    const { drawerAdd } = this.state

    return (
      <div className={classes.root}>
        {/* Actions */}
        <div className={classes.actions}>
          <Button onClick={this.add}>
            <IconAdd className={classes.actionIcon} />
            Add
          </Button>

          <Button onClick={this.refresh}>
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
                  edit={this.edit}
                  showClient={false}
                />
              </Fade>
        }

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
              clientId={client._id}
              clientShowLoading={false}
              successCallback={this.successCallback}
              clientSelectionHide={true}
            />
          </div>
        </Drawer>
      </div>
    )
  }
}

// Component Properties
Interviewers.propTypes = {
  classes: PropTypes.object.isRequired,
  interviewersByClient: PropTypes.object.isRequired,
  clientDashboard: PropTypes.object.isRequired,
  getListByClient: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  editClose: PropTypes.func.isRequired,
  messageShow: PropTypes.func.isRequired
}

// Component State
function interviewersState(state) {
  return {
    interviewersByClient: state.interviewersByClient,
    clientDashboard: state.clientDashboard
  }
}

export default connect(interviewersState, { getListByClient, edit, editClose, messageShow })(withStyles(styles)(Interviewers))
