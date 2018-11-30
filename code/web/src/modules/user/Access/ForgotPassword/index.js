// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

// UI Import
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'

// App Imports
import ResetPassword from '../../ResetPassword'

// Component
class ForgotPassword extends PureComponent {
  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <Typography
          variant={'subtitle1'}
          color={'inherit'}
          className={classes.heading}
        >
          Forgot your password? No problem, reset your password here:
        </Typography>

        <ResetPassword />
      </div>
    )
  }
}

// Component Properties
ForgotPassword.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ForgotPassword)
