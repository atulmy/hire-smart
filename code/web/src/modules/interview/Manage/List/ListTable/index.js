// Imports
import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment/moment'

// UI Imports
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import IconEdit from '@material-ui/icons/Edit'
import IconVisibility from '@material-ui/icons/Visibility'
import IconEmail from '@material-ui/icons/Email'
import { withStyles } from '@material-ui/core/styles/index'
import styles from './styles'

// App Imports
import params from '../../../../../setup/config/params'
import EmptyMessage from '../../../../common/EmptyMessage'

// Component
const ListTable = (props) => {
  const { classes, list, view, edit, remind } = props

  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>Candidate</TableCell>
          <TableCell>Interviewer</TableCell>
          <TableCell title={'Year-Month-Date Hour:Minute'}>Date and time</TableCell>
          <TableCell width={200} className={classes.textCenter}>Actions</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {
          list && list.length > 0
            ? list.map(interview => (
              <TableRow key={interview._id}>
                  <TableCell>{ interview.candidateId.name }</TableCell>
                  <TableCell>{ interview.interviewerId.name }</TableCell>
                  <TableCell>{ moment(new Date(interview.dateTime)).format(`${ params.date.format.nice.date }, ${ params.date.format.nice.time }`)  }</TableCell>
                  <TableCell className={classes.textCenter}>
                    <Tooltip title={'Send reminder'} placement={'top'} enterDelay={500}>
                      <IconButton
                        aria-label={'Send reminder'}
                        onClick={remind(interview)}
                      >
                        <IconEmail className={classes.icon} />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title={'View all details'} placement={'top'} enterDelay={500}>
                      <IconButton
                        aria-label={'View all details'}
                        onClick={view(interview)}
                      >
                        <IconVisibility className={classes.icon} />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title={'Edit'} placement={'top'} enterDelay={500}>
                      <IconButton
                        aria-label={'Edit'}
                        onClick={edit(interview)}
                      >
                        <IconEdit className={classes.icon} />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            : <TableRow>
                <TableCell colSpan={4}>
                  <EmptyMessage message={'You have not scheduled any interviews yet.'} />
                </TableCell>
              </TableRow>
        }
      </TableBody>
    </Table>
  )
}

// Component Properties
ListTable.propTypes = {
  classes: PropTypes.object.isRequired,
  list: PropTypes.array.isRequired,
  view: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  remind: PropTypes.func.isRequired
}

export default withStyles(styles)(ListTable)

