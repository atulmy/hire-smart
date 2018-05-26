// Imports
import React from 'react'
import PropTypes from 'prop-types'

// UI Imports
import Typography from '@material-ui/core/Typography'

// Component
const EmptyMessage = (props) => (
  <Typography variant={'caption'} gutterBottom align="center">
    { props.message }
  </Typography>
)

// Component Properties
EmptyMessage.propTypes = {
  message: PropTypes.string
}

// Component Default Properties
EmptyMessage.defaultProps = {
  message: 'No data to show'
}

export default EmptyMessage
