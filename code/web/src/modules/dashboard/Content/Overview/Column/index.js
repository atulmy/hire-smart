// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { DropTarget } from 'react-dnd'

// UI Imports
import grey from '@material-ui/core/colors/grey'
import { withStyles } from '@material-ui/core/styles/index'
import styles from './styles'

// App Imports

// Component
class Column extends PureComponent {
  render() {
    const { children, classes, last, columnWidth, connectDropTarget, isOver } = this.props

    return connectDropTarget(
      <div
        className={classes.column}
        style={{
          width: columnWidth,
          borderRight: last ? `1px solid ${ grey[200] }` : '',
          backgroundColor: isOver ? '#fffde7bb' : 'transparent'
        }}
      >
        { children }
      </div>
    )
  }
}

// Component Properties
Column.propTypes = {
  classes: PropTypes.object.isRequired,
  columnWidth: PropTypes.number.isRequired,
  last: PropTypes.bool.isRequired
}

// Drag and Drop
// Collect
function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  }
}
// Receive
const dropTarget = {
  drop(props, monitor) {
    props.itemDropped(monitor.getItem().kanbanId, props.columnKey)
  }
}

export default compose(
  DropTarget('card', dropTarget, collect),
  withStyles(styles)
)(Column)
