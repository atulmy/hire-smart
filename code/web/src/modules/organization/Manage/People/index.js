// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// UI Imports
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'

// App Imports
// import { someAction } from './api/actions'

// Component
class People extends PureComponent {

  constructor(props) {
    super(props)

    this.state = {}
  }

  componentDidMount() {
    // this.props.someAction()
  }

  render() {
    return (
      <div>
        <h1>People</h1>
      </div>
    )
  }
}

// Component Properties
People.propTypes = {
  classes: PropTypes.object.isRequired,
  // someAction: PropTypes.func.isRequired,
}

// Component State
function peopleState(state) {
  return state
}

export default connect(peopleState, { /* someAction */ })(withStyles(styles)(People))
