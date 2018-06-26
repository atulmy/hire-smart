// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// UI Imports
import Fade from '@material-ui/core/Fade'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import IconCheck from '@material-ui/icons/Check'
import green from '@material-ui/core/colors/green'
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'

// App Imports
import routes from '../../../../../setup/routes'
import Verify from '../../../Verify'

// Component
class Demo extends PureComponent {
  stepFinish = () => {
    const { history } = this.props

    history.push(routes.account.path)
  }

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
              Verify Your Account
            </Typography>
          </Toolbar>

          {/* Content */}
          <div className={classes.content}>
            {
              details.demo
                ? <React.Fragment>
                    <Typography gutterBottom>
                      You are using a demo account. Complete below steps to enable all features and avoid losing your data.
                    </Typography>

                    <Grid container style={{ marginTop: 16 }}>
                      <Grid item xs={12} md={6}>
                        <Verify />
                      </Grid>
                    </Grid>
                  </React.Fragment>
                : <React.Fragment>
                    <Grid container>
                      <Grid item xs={12} md={6}>
                        <ListItem>
                          <Avatar style={{ backgroundColor: green[500] }}>
                            <IconCheck />
                          </Avatar>
                          <ListItemText primary={'Account verified'} secondary={'You can now access all the features.'} />
                        </ListItem>

                        <Button
                          variant={'contained'}
                          color={'primary'}
                          style={{ marginTop: 16, marginLeft: 26 }}
                          onClick={this.stepFinish}
                        >
                          View My Profile
                        </Button>
                      </Grid>
                    </Grid>
                  </React.Fragment>
            }
          </div>
        </div>
      </Fade>
    )
  }
}

// Component Properties
Demo.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

// Component State
function demoState(state) {
  return {
    user: state.user
  }
}

export default connect(demoState, {})(withStyles(styles)(Demo))
