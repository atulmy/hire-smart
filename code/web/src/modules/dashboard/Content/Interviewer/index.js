// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// UI Imports
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
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
import { editClose } from '../../../interviewer/api/actions/mutation'
import Loading from '../../../common/Loading'
import EmptyMessage from '../../../common/EmptyMessage'
import CreateOrEdit from '../../../interviewer/Manage/CreateOrEdit'

// Component
class Interviewers extends PureComponent {

  constructor() {
    super()

    this.state = {
      drawerAdd: false
    }
  }

  componentDidMount() {
    const { editClose } = this.props

    editClose()

    this.refresh()
  }

  componentWillReceiveProps(nextProps) {
    const { clientDashboard: { client } } = nextProps

    if(client._id !== this.props.clientDashboard.client._id) {
      this.refresh(client._id)
    }
  }

  refresh = (isLoading = true, clientId = null) => {
    const { getListByClient, clientDashboard: { client } } = this.props

    getListByClient({ clientId: clientId || client._id }, isLoading)
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

  render() {
    const { classes, clientDashboard: { client }, interviewersByClient: { isLoading, list } } = this.props
    const { drawerAdd } = this.state

    return (
      <div className={classes.root}>
        {/* Actions */}
        <div className={classes.actions}>
          <Button onClick={this.toggleDrawer(true)}>
            <IconAdd className={classes.actionIcon} />
            Add
          </Button>

          <Button onClick={this.refresh}>
            <IconCached className={classes.actionIcon} />
            Refresh
          </Button>
        </div>

        <Divider className={classes.divider} />

        {/* Candidate list */}
        {
          isLoading
            ? <Loading />
            : <Fade in={true}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Mobile</TableCell>
                    </TableRow>
                  </TableHead>
  
                  <TableBody>
                    {
                      list && list.length > 0
                        ? list.map(interviewer => (
                          <TableRow key={interviewer._id}>
                            <TableCell>{ interviewer.name }</TableCell>
                            <TableCell>{ interviewer.email }</TableCell>
                            <TableCell>{ interviewer.mobile }</TableCell>
                          </TableRow>
                        ))
                        : <TableRow>
                          <TableCell colSpan={4}>
                            <EmptyMessage message={'You have not added any interviewer yet.'} />
                          </TableCell>
                        </TableRow>
                    }
                  </TableBody>
                </Table>
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

export default connect(interviewersState, { getListByClient, editClose, messageShow })(withStyles(styles)(Interviewers))
