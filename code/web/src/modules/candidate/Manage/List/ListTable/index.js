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
import IconVisibility from '@material-ui/icons/Visibility'
import { withStyles } from '@material-ui/core/styles/index'
import styles from './styles'

// App Imports
import EmptyMessage from '../../../../common/EmptyMessage'

// Component
const ListTable = (props) => {
  const { classes, list, view, edit } = props

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Client</TableCell>
          <TableCell>Job</TableCell>
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
                <TableCell>{ candidate.jobId ? candidate.jobId.role : '-' }</TableCell>
                <TableCell>{ candidate.mobile }</TableCell>
                <TableCell className={classes.textCenter}>
                  <Tooltip title={'View all details'} placement={'top'} enterDelay={500}>
                    <IconButton
                      aria-label={'View all details'}
                      onClick={view(candidate)}
                    >
                      <IconVisibility />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title={'Edit'} placement={'top'} enterDelay={500}>
                    <IconButton
                      aria-label={'Edit'}
                      onClick={edit(candidate)}
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
  )
}

// Component Properties
ListTable.propTypes = {
  classes: PropTypes.object.isRequired,
  list: PropTypes.array.isRequired,
  view: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired
}

export default withStyles(styles)(ListTable)

