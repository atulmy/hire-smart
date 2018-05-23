// Imports
import React from 'react'
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
import { logout } from '../api/actions'

// Component
const Account = (props) => {
  const { classes, logout } = props
  
  return(
    <div>
      {/* Meta tags */}
      <Helmet>
        <title>Account - Hire Smart</title>
      </Helmet>

      <Grid container>
        <Grid item xs={12}>
          <Typography variant={'display1'}>
            Account
          </Typography>

          <Button
            variant={'raised'}
            onClick={logout}
          >
            Logout
          </Button>
        </Grid>
      </Grid>
    </div>
  )
}

// Component Properties
Account.propTypes = {
  classes: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
}

export default connect(null, { logout })(withStyles(styles)(Account))
