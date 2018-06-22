// Imports
import React from 'react'
import PropTypes from 'prop-types'

// UI Imports
import { withStyles } from '@material-ui/core/styles/index'
import styles from './styles'

// App Imports

// Component
const Profile = (props) => (
  <div>
    <h1>Profile</h1>
  </div>
)

// Component Properties
Profile.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Profile)

