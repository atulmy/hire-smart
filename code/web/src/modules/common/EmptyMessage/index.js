// Imports
import React from 'react'
import PropTypes from 'prop-types'

// UI Imports
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

// Component
const EmptyMessage = (props) => (
  <Box component="span" m={2}>
    <Typography variant={'caption'} align="center">
      { props.message }
    </Typography>
  </Box>
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
