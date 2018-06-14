// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { DropTarget } from 'react-dnd'

// UI Imports
import { withStyles } from '@material-ui/core/styles/index'
import styles from '../styles'

// App Imports
import grey from '@material-ui/core/colors/grey'

// Component
class Item extends PureComponent {
  render() {
    const { children, classes, i, column, columns, columnWidth, connectDropTarget } = this.props

    return connectDropTarget(
      <div
        className={classes.column}
        style={{ width: columnWidth, borderRight: i !== (columns.length - 1) ? `1px solid ${ grey[200] }` : '' }}
      >
        { children }
      </div>
    )
  }
}

// Component Properties
Item.propTypes = {
  classes: PropTypes.object.isRequired,
  column: PropTypes.object.isRequired,
  columns: PropTypes.array.isRequired,
  columnWidth: PropTypes.number.isRequired,
  i: PropTypes.number.isRequired,
}

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget()
  }
}

export default compose(
  DropTarget('card', {}, collect),
  withStyles(styles)
)(Item)
