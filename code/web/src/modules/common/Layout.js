// Imports
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class Layout extends Component {

  render() {
    const { children } = this.props

    return (
      <div>
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
