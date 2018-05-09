// Imports
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// UI Imports
import CssBaseline from 'material-ui/CssBaseline'

// Component
class Layout extends Component {
  render() {
    const { children } = this.props

    return (
      <div>
        <CssBaseline />

        {children}
      </div>
    )
  }
}

// Component Properties
Layout.propTypes = {
  common: PropTypes.object.isRequired
}

// Component State
function commonState(state) {
  return {
    common: state.common
  }
}

export default connect(commonState, {})(Layout)
