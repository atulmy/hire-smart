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
import { getListByClient } from '../../../candidate/api/actions/query'
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
    const { classes, clientDashboard: { client },  candidatesByClient: { isLoading, list }, candidateView, viewHide } = this.props
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
                  view={this.view}
                  edit={this.edit}
                  showClient={false}
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
          { <View /> }
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
          <CreateOrEdit
            elevation={0}
            clientId={client._id}
            clientShowLoading={false}
            successCallback={this.successCallback}
            clientSelectionHide={true}
          />
        </Drawer>
      </div>
    )
  }
}

// Component Properties
Candidates.propTypes = {
  classes: PropTypes.object.isRequired,
  candidatesByClient: PropTypes.object.isRequired,
  clientDashboard: PropTypes.object.isRequired,
  candidateView: PropTypes.object.isRequired,
  getListByClient: PropTypes.func.isRequired,
  view: PropTypes.func.isRequired,
  viewHide: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  editClose: PropTypes.func.isRequired,
  messageShow: PropTypes.func.isRequired
}

// Component State
function candidatesState(state) {
  return {
    candidatesByClient: state.candidatesByClient,
    clientDashboard: state.clientDashboard,
    candidateView: state.candidateView
  }
}

export default connect(candidatesState, { getListByClient, view, viewHide, edit, editClose, messageShow })(withStyles(styles)(Candidates))
