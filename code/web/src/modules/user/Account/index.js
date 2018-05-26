// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'

// UI Imports
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'

// App Imports
import { messageShow } from '../../common/api/actions'
import { logout } from '../api/actions'

// Component
class Account extends PureComponent {
  onLogout = () => {
    const { logout, messageShow } = this.props
    logout()

    messageShow('You have been logged out successfully.')
  }

  render() {
    const { classes } = this.props

    return(
      <div>
        {/* Meta tags */}
        <Helmet>
          <title>Account - HireSmart</title>
        </Helmet>

        <Grid container>
          <Grid item xs={12}>
            <Typography variant={'display1'}>
              Account
            </Typography>

            <Button
              variant={'raised'}
              color={'primary'}
              onClick={this.onLogout}
            >
              Logout
            </Button>
          </Grid>
        </Grid>
      </div>
    )
  }
}

// Component Properties
Account.propTypes = {
  classes: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  messageShow: PropTypes.func.isRequired
}

export default connect(null, { logout, messageShow })(withStyles(styles)(Account))
