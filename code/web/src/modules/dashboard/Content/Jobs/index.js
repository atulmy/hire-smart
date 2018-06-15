// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment'

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
import { getListByClient } from '../../../job/api/actions/query'
import { editClose } from '../../../job/api/actions/mutation'
import Loading from '../../../common/Loading'
import EmptyMessage from '../../../common/EmptyMessage'
import CreateOrEdit from '../../../job/Manage/CreateOrEdit'

// Component
class Jobs extends PureComponent {

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

  render() {
    const { classes, clientDashboard: { client }, jobsByClient: { isLoading, list } } = this.props
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

        <Divider />

        {/* Job list */}
        {
          isLoading
            ? <Loading />
            : <Fade in={true}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Role</TableCell>
                      <TableCell>Description</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {
                      list && list.length > 0
                        ? list.map(job => (
                          <TableRow key={job._id}>
                            <TableCell>{ job.role }</TableCell>
                            <TableCell>{ job.description }</TableCell>
                          </TableRow>
                        ))
                        : <TableRow>
                          <TableCell colSpan={3}>
                            <EmptyMessage message={'You have not added any job yet.'} />
                          </TableCell>
                        </TableRow>
                    }
                  </TableBody>
                </Table>
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
Jobs.propTypes = {
  classes: PropTypes.object.isRequired,
  jobsByClient: PropTypes.object.isRequired,
  clientDashboard: PropTypes.object.isRequired,
  getListByClient: PropTypes.func.isRequired,
  editClose: PropTypes.func.isRequired,
  messageShow: PropTypes.func.isRequired
}

// Component State
function jobsState(state) {
  return {
    jobsByClient: state.jobsByClient,
    clientDashboard: state.clientDashboard
  }
}

export default connect(jobsState, { getListByClient, editClose, messageShow })(withStyles(styles)(Jobs))
