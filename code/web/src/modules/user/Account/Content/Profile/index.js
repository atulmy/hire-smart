// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// UI Imports
import Grid from '@material-ui/core/Grid'
import Fade from '@material-ui/core/Fade'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles/index'
import styles from './styles'

// Component
class Profile extends PureComponent {
  render() {
    const { classes, user: { details } } = this.props

    return (
      <Fade in={true}>
        <div>
          {/* Toolbar - Heading */}
          <Toolbar className={classes.toolbar}>
            <Typography
              variant={'body2'}
              color={'inherit'}
              className={classes.title}
            >
              Your Account
            </Typography>
          </Toolbar>

          {/* Content */}
          <div className={classes.content}>
            <Grid container>
              <Grid item xs={12} md={6}>
                <div className={classes.item}>
                  <Typography variant={'caption'} gutterBottom>
                    Name
                  </Typography>

                  <Typography gutterBottom>
                    { details.name }
                  </Typography>
                </div>

                <div className={classes.item}>
                  <Typography variant={'caption'} gutterBottom>
                    Email
                  </Typography>

                  <Typography gutterBottom>
                    { details.email }
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
      </Fade>
    )
  }
}

// Component Properties
Profile.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

// Component State
function profileState(state) {
  return {
    user: state.user
  }
}

export default connect(profileState, {})(withStyles(styles)(Profile))

