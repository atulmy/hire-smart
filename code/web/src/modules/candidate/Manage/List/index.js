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
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import IconEdit from '@material-ui/icons/Edit'
import IconVisibility from '@material-ui/icons/Visibility'
import Fade from '@material-ui/core/Fade'
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'

// App Imports
import { getList } from '../../api/actions/query'
import { edit, view, viewHide } from '../../api/actions/mutation'
import Loading from '../../../common/Loading'
import EmptyMessage from '../../../common/EmptyMessage'
import View from '../View'

// Component
class List extends PureComponent {
  constructor() {
    super()

    this.state = {
      drawerView: false
    }
  }
  
  componentDidMount() {
    this.refresh()
  }

  refresh = (isLoading = true) => {
    const { getList } = this.props

    getList(isLoading)
  }

  edit = candidate => () => {
    const { edit } = this.props

    edit(candidate)
  }

  view = candidate => () => {
    const { view } = this.props

    view(candidate)
  }

  render() {
    const { classes, candidates, candidateView, viewHide } = this.props
    const { isLoading, list } = candidates

    return (
      <div className={classes.root}>
        {
          isLoading
            ? <Loading />
            : <Fade in={true}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Client</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Mobile</TableCell>
                      <TableCell width={145} className={classes.textCenter}>Actions</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {
                      list && list.length > 0
                        ? list.map(candidate => (
                            <TableRow key={candidate._id}>
                              <TableCell>{ candidate.name }</TableCell>
                              <TableCell>{ candidate.clientId.name }</TableCell>
                              <TableCell>{ candidate.email }</TableCell>
                              <TableCell>{ candidate.mobile }</TableCell>
                              <TableCell className={classes.textCenter}>
                                <Tooltip title={'More info'} placement={'top'} enterDelay={500}>
                                  <IconButton
                                    aria-label={'More info'}
                                    onClick={this.view(candidate)}
                                  >
                                    <IconVisibility />
                                  </IconButton>
                                </Tooltip>

                                <Tooltip title={'Edit'} placement={'top'} enterDelay={500}>
                                  <IconButton
                                    aria-label={'Edit'}
                                    onClick={this.edit(candidate)}
                                  >
                                    <IconEdit />
                                  </IconButton>
                                </Tooltip>
                              </TableCell>
                            </TableRow>
                          ))
                        : <TableRow>
                            <TableCell colSpan={7}>
                              <EmptyMessage message={'You have not added any candidates yet.'} />
                            </TableCell>
                          </TableRow>
                    }
                  </TableBody>
                </Table>
              </Fade>
        }

        {/* Candidate create or edit */}
        <Drawer anchor={'right'} open={candidateView.open} onClose={viewHide}>
          { <View /> }
        </Drawer>
      </div>
    )
  }
}

// Component Properties
List.propTypes = {
  classes: PropTypes.object.isRequired,
  candidates: PropTypes.object.isRequired,
  candidateView: PropTypes.object.isRequired,
  getList: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  view: PropTypes.func.isRequired,
  viewHide: PropTypes.func.isRequired
}

// Component State
function listState(state) {
  return {
    candidates: state.candidates,
    candidateView: state.candidateView
  }
}

export default connect(listState, { getList, edit, view, viewHide })(withStyles(styles)(List))
