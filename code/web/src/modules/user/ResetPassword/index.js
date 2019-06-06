// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import isEmpty from 'lodash/isEmpty'

// UI Imports
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import IconButton from '@material-ui/core/IconButton'
import IconCheck from '@material-ui/icons/Check'
import IconArrowBack from '@material-ui/icons/ArrowBack'
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'

// App Imports
import { nullToEmptyString } from '../../../setup/helpers'
import { resetPasswordSendCode, resetPasswordVerifyCode, resetPasswordUpdate } from '../api/actions/mutation'
import { messageShow } from '../../common/api/actions'

// Component
class ResetPassword extends PureComponent {
  constructor(props) {
    super(props)

    this.demo = {
      email: '',
      verification: '',
      password: ''
    }

    this.state = {
      isLoadingSubmit: false,

      enableStep1: true,
      expandStep1: true,

      enableStep2: false,
      expandStep2: false,

      enableStep3: false,
      expandStep3: false,

      ...this.demo
    }
  }

  onType = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  isLoadingSubmitToggle = isLoadingSubmit => {
    this.setState({
      isLoadingSubmit
    })
  }

  step1 = async event => {
    event.preventDefault()

    const { email } = this.state

    if(!isEmpty(email)) {
      const { resetPasswordSendCode, messageShow } = this.props

      this.isLoadingSubmitToggle(true)

      try {
        const { data } = await resetPasswordSendCode({ email })

        if(data.errors && data.errors.length > 0) {
          messageShow(data.errors[0].message)
        } else {
          // Show step 2
          this.setState({
            enableStep2: true,
            expandStep2: true,
            expandStep1: false
          })

          messageShow('An email has been sent with verification code.')
        }
      } catch(error) {
        messageShow('There was some error. Please try again.')
      } finally {
        this.isLoadingSubmitToggle(false)
      }
    }
  }

  backToStep1 = () => {
    this.setState({
      enableStep1: true,
      expandStep1: true,
      enableStep2: false,
      expandStep2: false
    })
  }

  step2 = async event => {
    event.preventDefault()

    const { resetPasswordVerifyCode, messageShow } = this.props

    const { email, verification } = this.state

    if(!isEmpty(verification)) {

      this.isLoadingSubmitToggle(true)

      try {
        const { data } = await resetPasswordVerifyCode({ email, code: verification })

        if(data.errors && data.errors.length > 0) {
          messageShow(data.errors[0].message)
        } else {
          // Show step 3
          this.setState({
            enableStep3: true,
            expandStep3: true,
            expandStep2: false
          })

          messageShow('Email verified successfully.')
        }
      } catch(error) {
        messageShow('There was some error. Please try again.')
      } finally {
        this.isLoadingSubmitToggle(false)
      }
    } else {
      messageShow('Please enter verification code sent to your email.')
    }
  }

  backToStep2 = () => {
    this.setState({
      enableStep2: true,
      expandStep2: true,
      enableStep3: false,
      expandStep3: false
    })
  }

  step3 = async event => {
    event.preventDefault()

    const { resetPasswordUpdate, messageShow } = this.props

    const { email, password } = this.state

    if(!isEmpty(email) && !isEmpty(password)) {

      resetPasswordUpdate({ email, password })
    } else {
      messageShow('Please provide all the details.')
    }
  }

  render() {
    const { classes, user: { isLoading } } = this.props
    const { isLoadingSubmit, email, verification, password } = this.state
    const { enableStep1, expandStep1, enableStep2, expandStep2, enableStep3, expandStep3  } = this.state

    return (
      <div>
        {/* STEP 1: Provide your official email */}
        <ExpansionPanel className={classes.panel} disabled={!enableStep1} expanded={expandStep1}>
          <ExpansionPanelSummary>
            <Typography variant={'body1'}>STEP 1: Provide your email address</Typography>
          </ExpansionPanelSummary>

          <ExpansionPanelDetails style={{ display: 'block' }}>
            <form onSubmit={this.step1}>
              {/* Input - email */}
              <Grid item xs={12}>
                <TextField
                  name={'email'}
                  type={'email'}
                  value={nullToEmptyString(email)}
                  onChange={this.onType}
                  label={'Your email'}
                  placeholder={'Enter official email'}
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
                  type={'submit'}
                  aria-label={'Save'}
                  color={'primary'}
                  disabled={isLoadingSubmit}
                >
                  <IconCheck />
                </IconButton>
              </Grid>
            </form>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        {/* STEP 2: Verify your email */}
        <ExpansionPanel className={classes.panel} disabled={!enableStep2} expanded={expandStep2}>
          <ExpansionPanelSummary>
            <Typography variant={'body1'}>STEP 2: Verify your email address</Typography>
          </ExpansionPanelSummary>

          <ExpansionPanelDetails style={{ display: 'block' }}>
            <form onSubmit={this.step2}>
              {/* Input - verification code */}
              <Grid item xs={12}>
                <TextField
                  name={'verification'}
                  value={nullToEmptyString(verification)}
                  onChange={this.onType}
                  label={'Verification code'}
                  placeholder={'Enter verification code'}
                  required={true}
                  margin={'normal'}
                  autoComplete={'off'}
                  style={{ marginTop: 0 }}
                  helperText={`Please check your email ${ email } for verification code`}
                  fullWidth
                  inputProps={{
                    maxLength: 4
                  }}
                />
              </Grid>

              {/* Button -  Save */}
              <Grid item xs={12} className={classes.buttonsContainer}>
                <IconButton
                  aria-label={'Previous step'}
                  color={'default'}
                  onClick={this.backToStep1}
                >
                  <IconArrowBack />
                </IconButton>

                <IconButton
                  type={'submit'}
                  aria-label={'Save'}
                  color={'primary'}
                  disabled={isLoadingSubmit}
                >
                  <IconCheck />
                </IconButton>
              </Grid>
            </form>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        {/* STEP 3: Set new password */}
        <ExpansionPanel className={classes.panel} disabled={!enableStep3} expanded={expandStep3}>
          <ExpansionPanelSummary>
            <Typography variant={'body1'}>STEP 3: Set new password</Typography>
          </ExpansionPanelSummary>

          <ExpansionPanelDetails style={{ display: 'block' }}>
            <form onSubmit={this.step3}>
              {/* Input - email */}
              <Grid item xs={12}>
                <TextField
                  type={'email'}
                  value={nullToEmptyString(email)}
                  label={'Your email'}
                  margin={'normal'}
                  helperText={'verified'}
                  fullWidth
                  readOnly={true}
                  disabled={true}
                  style={{ marginTop: 0 }}
                />
              </Grid>

              {/* Input - password */}
              <Grid item xs={12}>
                <TextField
                  name={'password'}
                  type={'password'}
                  value={nullToEmptyString(password)}
                  onChange={this.onType}
                  label={'Your new password'}
                  placeholder={'Enter new password'}
                  helperText={'use this password to login'}
                  required={true}
                  margin={'normal'}
                  autoComplete={'off'}
                  fullWidth
                />
              </Grid>

              {/* Button -  Save */}
              <Grid item xs={12} className={classes.buttonsContainer}>
                <IconButton
                  aria-label={'Previous step'}
                  color={'default'}
                  onClick={this.backToStep2}
                >
                  <IconArrowBack />
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
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    )
  }
}

// Component Properties
ResetPassword.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  resetPasswordSendCode: PropTypes.func.isRequired,
  resetPasswordVerifyCode: PropTypes.func.isRequired,
  resetPasswordUpdate: PropTypes.func.isRequired,
  messageShow: PropTypes.func.isRequired,
}

// Component State
function resetPasswordState(state) {
  return {
    user: state.user
  }
}

export default connect(resetPasswordState, { resetPasswordSendCode, resetPasswordVerifyCode, resetPasswordUpdate, messageShow })(withStyles(styles)(ResetPassword))
