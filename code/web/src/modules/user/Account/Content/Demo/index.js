// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import isEmpty from 'validator/lib/isEmpty'

// UI Imports
import Toolbar from '@material-ui/core/Toolbar'
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
import { nullToEmptyString } from '../../../../../setup/helpers'
import routes from '../../../../../setup/routes'
// import { someAction } from './api/actions'

// Component
class Demo extends PureComponent {

  constructor(props) {
    super(props)

    this.demo = {
      email: '',
      verification: '',
      name: '',
      password: '',
      organizationName: ''
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

  componentDidMount() {
    // const { someAction } = this.props
  }

  demoSubmit = () => {
    console.log(this.state)
  }

  onType = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  step1 = async event => {
    event.preventDefault()

    const { email } = this.state

    if(!isEmpty(email)) {
      console.log(email)

      // @todo send verification code to this email

      this.setState({
        enableStep2: true,
        expandStep2: true,
        expandStep1: false
      })
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

    const { verification } = this.state

    if(!isEmpty(verification)) {
      console.log(verification)

      // @todo send data

      this.setState({
        enableStep3: true,
        expandStep3: true,
        expandStep2: false
      })
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

    const { history } = this.props
    const { name, email, verification, password, organizationName } = this.state

    if(!isEmpty(name) && !isEmpty(password) && !isEmpty(organizationName)) {
      console.log(name)
      console.log(password)
      console.log(organizationName)

      // @todo send data

      this.setState({
        expandStep3: false
      })

      history.push(routes.account.path)
    }
  }

  render() {
    const { classes } = this.props
    const { isLoadingSubmit, name, email, verification, password, organizationName } = this.state
    const { enableStep1, expandStep1, enableStep2, expandStep2, enableStep3, expandStep3  } = this.state

    return (
      <div>
        {/* Toolbar - Heading */}
        <Toolbar className={classes.toolbar}>
          <Typography
            variant={'body2'}
            color={'inherit'}
            className={classes.title}
          >
            You are using a demo account. To enable all features and avoid loss of data, please complete the following steps
          </Typography>
        </Toolbar>

        {/* Content */}
        <div className={classes.content}>
          <Grid container>
            <Grid item xs={12} md={6}>
              {/* STEP 1: Provide your official email */}
              <ExpansionPanel className={classes.panel} disabled={!enableStep1} expanded={expandStep1}>>
                <ExpansionPanelSummary>
                  <Typography variant={'body2'}>STEP 1: Provide your official email address</Typography>
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
                  <Typography variant={'body2'}>STEP 2: Verify your email address</Typography>
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

              {/* STEP 3: Account info */}
              <ExpansionPanel className={classes.panel} disabled={!enableStep3} expanded={expandStep3}>
                <ExpansionPanelSummary>
                  <Typography variant={'body2'}>STEP 3: Account info</Typography>
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
                        label={'Your password'}
                        placeholder={'Enter new password'}
                        helperText={'Use this password to login'}
                        required={true}
                        margin={'normal'}
                        autoComplete={'off'}
                        fullWidth
                      />
                    </Grid>

                    {/* Input - name */}
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
                        fullWidth
                      />
                    </Grid>

                    {/* Input - Organization name */}
                    <Grid item xs={12}>
                      <TextField
                        name={'organizationName'}
                        value={nullToEmptyString(organizationName)}
                        onChange={this.onType}
                        label={'Organization name'}
                        placeholder={'Enter name (eg: HireSmart)'}
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
                        disabled={isLoadingSubmit}
                      >
                        <IconCheck />
                      </IconButton>
                    </Grid>
                  </form>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </Grid>
          </Grid>
        </div>
      </div>
    )
  }
}

// Component Properties
Demo.propTypes = {
  classes: PropTypes.object.isRequired,
  // someAction: PropTypes.func.isRequired,
}

// Component State
function demoState(state) {
  return {
    common: state.common
  }
}

export default connect(demoState, { /* someAction */ })(withStyles(styles)(Demo))
