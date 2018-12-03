// Imports
import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom'

// App Imports
import IconButton from '@material-ui/core/IconButton/IconButton'
import IconArrowBack from '@material-ui/icons/ArrowBack'

// Component
class ActionBack extends PureComponent {

  onClick = () => {
    const { history } = this.props

    history.goBack()
  }

  render() {
    return (
      <IconButton
        onClick={this.onClick}
        aria-label="Back"
        color="inherit"
        style={{ marginLeft: -12 }}
      >
        <IconArrowBack />
      </IconButton>
    )
  }
}

export default withRouter(ActionBack)
