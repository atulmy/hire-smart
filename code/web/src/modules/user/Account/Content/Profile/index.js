// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import isEmpty from 'lodash/isEmpty'

// UI Imports
import Grid from '@material-ui/core/Grid'
import Fade from '@material-ui/core/Fade'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import IconEdit from '@material-ui/icons/Edit'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import IconCheck from '@material-ui/icons/Check'
import IconClose from '@material-ui/icons/Close'
import { withStyles } from '@material-ui/core/styles/index'
import styles from './styles'
import { nullToEmptyString } from '../../../../../setup/helpers'

// App Imports
import { messageShow, messageHide } from '../../../../common/api/actions'
import { update } from '../../../api/actions/mutation'

// Component
class Profile extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      edit: false,

      isLoading: false,
      name: props.user.details.name
    }
  }

  editToggle = () => {
    this.setState({
      edit: !this.state.edit
    })
  }

  onType = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  isLoadingToggle = isLoading => {
    this.setState({
      isLoading
    })
  }

  onSubmit = async event => {
    event.preventDefault()

    const { update, messageShow } = this.props
    const { name } = this.state

    if(!isEmpty(name)) {
      update({ name })
    } else {
      messageShow('Please enter your name.')
    }
  }

  render() {
    const { classes, user: { details } } = this.props
    const { edit, name, isLoading } = this.state

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

            <Button onClick={this.editToggle}>
              <IconEdit className={classes.actionIcon} />
              Edit
            </Button>
          </Toolbar>

          {/* Content */}
          <div className={classes.content}>
            <Grid container>
              <Grid item xs={12} md={6}>
                {
                  edit
                    ? <React.Fragment>
                        <form onSubmit={this.onSubmit}>
                          {/* Input - email */}
                          <Grid item xs={12}>
                            <TextField
                              name={'name'}
                              value={nullToEmptyString(name)}
                              onChange={this.onType}
                              label={'Your name'}
                              placeholder={'Enter name'}
                              required={true}
                              margin={'normal'}
                              autoComplete={'off'}
                              style={{ marginTop: 0 }}
                              fullWidth
                              autoFocus
                            />
                          </Grid>

                          {/* Button -  Save */}
                          <Grid item xs={12} className={classes.buttonsContainer}>
                            <IconButton
                              aria-label={'Cancel'}
                              onClick={this.editToggle}
                            >
                              <IconClose />
                            </IconButton>

                            <IconButton
                              type={'submit'}
                              aria-label={'Save'}
                              color={'primary'}
                              disabled={isLoading}
                            >
                              <IconCheck />
                            </IconButton>
                          </Grid>
                        </form>
                      </React.Fragment>
                    : <React.Fragment>
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
                      </React.Fragment>
                }

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
  user: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired,
  messageShow: PropTypes.func.isRequired,
  messageHide: PropTypes.func.isRequired
}

// Component State
function profileState(state) {
  return {
    user: state.user
  }
}

export default connect(profileState, { update, messageShow, messageHide })(withStyles(styles)(Profile))

