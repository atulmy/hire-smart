// Imports
import React from 'react'
import PropTypes from 'prop-types'

// UI Imports
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import IconEdit from '@material-ui/icons/Edit'
import { withStyles } from '@material-ui/core/styles/index'
import styles from './styles'

// App Imports
import EmptyMessage from '../../../../common/EmptyMessage'

// Component
const ListTable = (props) => {
  const { classes, list, edit, showProject } = props

  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          { showProject && <TableCell>Project</TableCell> }
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
                  { showProject && <TableCell>{ interviewer.projectId.name }</TableCell> }
                  <TableCell>{ interviewer.email }</TableCell>
                  <TableCell>{ interviewer.mobile }</TableCell>
                  <TableCell className={classes.textCenter}>
                    <Tooltip title={'Edit'} placement={'bottom'} enterDelay={500}>
                      <IconButton
                        aria-label={'Edit'}
                        onClick={edit(interviewer)}
                      >
                        <IconEdit />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            : <TableRow>
                <TableCell colSpan={5}>
                  <EmptyMessage message={'You have not added any interviewers yet.'} />
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
  edit: PropTypes.func.isRequired
}
ListTable.defaultProps = {
  showProject: true
}

export default withStyles(styles)(ListTable)

