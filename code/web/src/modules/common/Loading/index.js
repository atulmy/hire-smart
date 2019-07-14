// Imports
import React from 'react'
import PropTypes from 'prop-types'

// UI Imports
import Box from '@material-ui/core/Box'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import yellow from '@material-ui/core/colors/yellow'

// App Imports

// Component
const Loading = (props) => {
  const { size, message } = props

  return(
    <Box display="flex" flexDirection="column" alignItems="center">
      <CircularProgress size={size} style={{ color: yellow[600] }} />

      <Box mt={1} color="text.hint">
        <Typography variant={'caption'} gutterBottom align="center" fontWeight="fontWeightLight">
          { message }
        </Typography>
      </Box>
    </Box>
  )
}

// Component Properties
Loading.propTypes = {
  size: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
}
Loading.defaultProps = {
  size: 40,
  message: 'please wait..',
}

export default Loading

