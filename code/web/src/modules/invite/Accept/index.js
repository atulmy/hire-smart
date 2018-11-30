// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import isEmpty from 'lodash/isEmpty'

// UI Imports
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Fade from '@material-ui/core/Fade'
import Zoom from '@material-ui/core/Zoom'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import IconCheck from '@material-ui/icons/Check'
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'

// App Imports
import routes from '../../../setup/routes'
import { nullToEmptyString } from '../../../setup/helpers'
import { get } from '../api/actions/query'
import { acceptInvite } from '../../user/api/actions/mutation'
import { messageShow } from '../../common/api/actions'
import AuthCheckAccess from '../../auth/AuthCheckAccess'
import Loading from '../../common/Loading'

// Component
class Invite extends PureComponent {

  constructor(props) {
    super(props)

    this.state = {
      isLoading: true,

      invite: null,

      name: '',
      email: '',
      password: ''
    }
  }

  componentDidMount() {
    this.refresh()
  }

  isLoadingToggle = (isLoading) => {
    this.setState({
      isLoading
    })
  }

  refresh = async () => {
    const { get, messageShow, match, history } = this.props

    const code = match.params.code

    try {
      const { data } = await get(code)

      if (data.errors && data.errors.length > 0) {
        messageShow(data.errors[0].message)
      } else {
        if(data.data && data.data._id) {
          this.setState({
            invite: data.data,
            name: data.data.name,
            email: data.data.email
          })
        } else {
          messageShow('Invalid invite link.')

          history.push(routes.home.path)
        }
      }
    } catch(error) {
      messageShow('There was some error. Please try again.')
    } finally {
      this.isLoadingToggle(false)
    }
  }

  onType = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  accept = event => {
    event.preventDefault()

    const { acceptInvite, messageShow } = this.props
    const { invite: { _id }, name, password } = this.state

    // Validate
    if(!isEmpty(_id) && !isEmpty(name) && !isEmpty(password)) {
      acceptInvite({ id: _id, name, password })
    } else {
      messageShow('Please enter all the required information.')
    }
  }

  render() {
    const { classes, user } = this.props
    const { isLoading, invite, name, email, password } = this.state

    return (
      <Fade in={true}>
        <div className={classes.root}>
          {
            isLoading
              ? <Loading />
              : <Zoom in={true}>
                  <Paper className={classes.container}>
                    <Typography variant={'h6'} gutterBottom style={{ textAlign: 'center' }}>
                      Invitation to join { invite.organizationId.name }
                    </Typography>

                    <Typography variant={'caption'} gutterBottom style={{ textAlign: 'center' }}>
                      To accept this invitation, please complete following form:
                    </Typography>

                    <form onSubmit={this.accept}>
                      <Grid container style={{ marginTop: 8 }}>
                        {/* Input - email */}
                        <Grid item xs={12}>
                          <TextField
                            type={'email'}
                            value={nullToEmptyString(email)}
                            label={'Your email'}
                            placeholder={'Enter your email'}
                            margin={'normal'}
                            fullWidth
                            inputProps={{
                              readOnly: true
                            }}
                            disabled
                          />
                        </Grid>

                        {/* Input - name */}
                        <Grid item xs={12}>
                          <TextField
                            name={'name'}
                            value={nullToEmptyString(name)}
                            onChange={this.onType}
                            label={'Your full name'}
                            placeholder={'Enter your full name'}
                            required={true}
                            margin={'normal'}
                            autoComplete={'off'}
                            fullWidth
                          />
                        </Grid>

                        {/* Input - password */}
                        <Grid item xs={12}>
                          <TextField
                            name={'password'}
                            type={'password'}
                            value={nullToEmptyString(password)}
                            onChange={this.onType}
                            label={'Password'}
                            placeholder={'Enter new password'}
                            required={true}
                            margin={'normal'}
                            autoComplete={'off'}
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
                            disabled={user.isLoading}
                          >
                            <IconCheck />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </form>
                  </Paper>
                </Zoom>
          }

          <AuthCheckAccess />
        </div>
      </Fade>
    )
  }
}

// Component Properties
Invite.propTypes = {
  classes: PropTypes.object.isRequired,
  get: PropTypes.func.isRequired,
  acceptInvite: PropTypes.func.isRequired,
  messageShow: PropTypes.func.isRequired
}

// Component State
function acceptState(state) {
  return {
    user: state.user
  }
}

export default connect(acceptState, { get, acceptInvite, messageShow })(withStyles(styles)(Invite))
