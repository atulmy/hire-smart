// Imports
import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment/moment'

// UI Imports
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import { withStyles } from '@material-ui/core/styles/index'
import styles from './styles'

// App Imports
import params from '../../../../../setup/config/params'
import EmptyMessage from '../../../../common/EmptyMessage'

// Component
const ListTable = (props) => {
  const { classes, list } = props

  return (
    <Table size="small">
      <TableBody>
        {
          list && list.length > 0
            ? list.map(activity => (
                <TableRow key={activity._id}>
                  <TableCell>{ activity.message }</TableCell>
                  <TableCell className={classes.textNoWrap} title={moment(activity.createdAt).format(`${ params.date.format.nice.date }, ${ params.date.format.nice.time }`)}>{ moment(activity.createdAt).fromNow() }</TableCell>
                </TableRow>
              ))
            : <TableRow>
                <TableCell colSpan={2}>
                  <EmptyMessage message={'No activity to show.'} />
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
}

export default withStyles(styles)(ListTable)

