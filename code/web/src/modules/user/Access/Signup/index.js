// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

// UI Import
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'

// App Imports
import Verify from '../../Verify'

// Component
class Signup extends PureComponent {
  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <Typography
          variant={'subtitle1'}
          color={'inherit'}
          className={classes.heading}
        >
          Don't have an account? Please signup:
        </Typography>

        <Verify />
      </div>
    )
  }
}

// Component Properties
Signup.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Signup)
