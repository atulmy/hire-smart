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
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import IconEdit from '@material-ui/icons/Edit'
import Fade from '@material-ui/core/Fade'
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'

// App Imports
import { getList } from '../../api/actions/query'
import { edit, editClose } from '../../api/actions/mutation'
import Loading from '../../../common/Loading'
import EmptyMessage from '../../../common/EmptyMessage'

// Component
class List extends PureComponent {
  componentDidMount() {
    this.refresh()
  }

  refresh = (isLoading = true) => {
    const { getList } = this.props

    getList(isLoading)
  }

  edit = interviewer => () => {
    const { edit } = this.props

    edit(interviewer)
  }

  render() {
    const { classes, interviewers } = this.props
    const { isLoading, list } = interviewers

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
                      <TableCell width={120} className={classes.textCenter}>Actions</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {
                      list && list.length > 0
                        ? list.map(interviewer => (
                            <TableRow key={interviewer._id}>
                              <TableCell>{ interviewer.name }</TableCell>
                              <TableCell>{ interviewer.clientId.name }</TableCell>
                              <TableCell>{ interviewer.email }</TableCell>
                              <TableCell>{ interviewer.mobile }</TableCell>
                              <TableCell className={classes.textCenter}>
                                <Tooltip title={'Edit'} placement={'bottom'} enterDelay={500}>
                                  <IconButton
                                    aria-label={'Edit'}
                                    onClick={this.edit(interviewer)}
                                  >
                                    <IconEdit />
                                  </IconButton>
                                </Tooltip>
                              </TableCell>
                            </TableRow>
                          ))
                        : <TableRow>
                            <TableCell colSpan={4}>
                              <EmptyMessage message={'You have not added any interviewers yet.'} />
                            </TableCell>
                          </TableRow>
                    }
                  </TableBody>
                </Table>
              </Fade>
        }
      </div>
    )
  }
}

// Component Properties
List.propTypes = {
  classes: PropTypes.object.isRequired,
  getList: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  editClose: PropTypes.func.isRequired,
}

// Component State
function listState(state) {
  return {
    interviewers: state.interviewers
  }
}

export default connect(listState, { getList, edit, editClose })(withStyles(styles)(List))
