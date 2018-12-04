// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

// App Imports
import IconButton from '@material-ui/core/IconButton/IconButton'
import IconArrowBack from '@material-ui/icons/ArrowBack'

// Component
class ActionBack extends PureComponent {

  onClick = () => {
    const { route, history } = this.props

    route ? history.push(route) : history.goBack()
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

// Component Properties
ActionBack.propTypes = {
  route: PropTypes.string
}

export default withRouter(ActionBack)
