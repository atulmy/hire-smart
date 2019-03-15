// Imports
import React from 'react'
import { withRouter } from 'react-router-dom'

// Component
class ScrollToTop extends React.PureComponent {

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0)
    }
  }

  render() {
    return this.props.children
  }
}

export default withRouter(ScrollToTop)
