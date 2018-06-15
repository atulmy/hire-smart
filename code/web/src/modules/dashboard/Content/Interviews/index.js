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
import params from '../../../../setup/config/params'
import { messageShow } from '../../../common/api/actions'
import { getListByClient } from '../../../interview/api/actions/query'
import { editClose } from '../../../interview/api/actions/mutation'
import Loading from '../../../common/Loading'
import EmptyMessage from '../../../common/EmptyMessage'
import CreateOrEdit from '../../../interview/Manage/CreateOrEdit'

// Component
class Interviews extends PureComponent {

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
      this.refresh(false, client._id)
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
    const { classes, clientDashboard: { client }, interviewsByClient: { isLoading, list } } = this.props
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
                      <TableCell>Candidate</TableCell>
                      <TableCell>Interviewer</TableCell>
                      <TableCell title={'Year-Month-Date Hour:Minute'}>Date and time</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {
                      list && list.length > 0
                        ? list.map(interview => (
                          <TableRow key={interview._id}>
                            <TableCell>{ interview.candidateId.name }</TableCell>
                            <TableCell>{ interview.interviewerId.name }</TableCell>
                            <TableCell>{ moment(interview.dateTime).format(`${ params.date.format.nice.date }, ${ params.date.format.nice.time }`)  }</TableCell>
                          </TableRow>
                        ))
                        : <TableRow>
                          <TableCell colSpan={3}>
                            <EmptyMessage message={'You have not scheduled any interview yet.'} />
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
  interviewsByClient: PropTypes.object.isRequired,
  clientDashboard: PropTypes.object.isRequired,
  getListByClient: PropTypes.func.isRequired,
  editClose: PropTypes.func.isRequired,
  messageShow: PropTypes.func.isRequired
}

// Component State
function interviewsState(state) {
  return {
    interviewsByClient: state.interviewsByClient,
    clientDashboard: state.clientDashboard
  }
}

export default connect(interviewsState, { getListByClient, editClose, messageShow })(withStyles(styles)(Interviews))
