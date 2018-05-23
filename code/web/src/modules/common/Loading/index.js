// Imports
import React from 'react'
import PropTypes from 'prop-types'

// UI Imports
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import yellow from '@material-ui/core/colors/yellow'
import { withStyles } from '@material-ui/core/styles/index'
import styles from './styles'

// App Imports

// Component
const Loading = (props) => {
  const { classes, size, message } = props

  return(
    <div className={classes.root}>
      <CircularProgress size={size} style={{ color: yellow[600] }} />

      <Typography variant={'caption'} gutterBottom align="center">
        { message }
      </Typography>
    </div>
  )
}

// Component Properties
Loading.propTypes = {
  classes: PropTypes.object.isRequired,
  size: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
}
Loading.defaultProps = {
  size: 40,
  message: 'please wait..',
}

export default withStyles(styles)(Loading)

