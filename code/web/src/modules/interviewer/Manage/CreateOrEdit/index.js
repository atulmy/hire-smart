// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import isEmpty from 'validator/lib/isEmpty'

// UI Imports
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import IconButton from '@material-ui/core/IconButton'
import IconCheck from '@material-ui/icons/Check'
import IconClose from '@material-ui/icons/Close'
import Zoom from '@material-ui/core/Zoom'
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'

// App Imports
import { nullToEmptyString } from '../../../../setup/helpers'
import { getList as getClientList } from '../../../client/api/actions/query'
import { createOrUpdate, editClose } from '../../api/actions/mutation'
import { messageShow } from '../../../common/api/actions'
import Loading from '../../../common/Loading'

// Component
class CreateOrEdit extends PureComponent {
  constructor(props) {
    super(props)

    this.interviewer = {
      id: '',
      clientId: props.clientId,
      name: '',
      email: '',
      mobile: ''
    }

    this.state = {
      isLoading: false,

      ...this.interviewer
    }
  }

  componentDidMount() {
    const { getClientList, clientShowLoading } = this.props

    getClientList(clientShowLoading)
  }

  componentWillReceiveProps(nextProps) {
    const { interviewer } = nextProps.interviewerEdit

    if(interviewer && interviewer._id !== this.state.id) {
      this.setState({
        id: interviewer._id,
        clientId: interviewer.clientId._id,
        name: interviewer.name,
        email: interviewer.email,
        mobile: interviewer.mobile
      })
    }
  }

  isLoadingToggle = isLoading => {
    this.setState({
      isLoading
    })
  }

  onType = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  reset = () => {
    this.setState({
      ...this.interviewer
    })

    editClose()
  }

  save = async event => {
    event.preventDefault()

    const { createOrUpdate, successCallback, messageShow } = this.props

    const { id, clientId, name, email, mobile } = this.state

    // Validate
    if(!isEmpty(name) && !isEmpty(email) && !isEmpty(mobile)) {
      messageShow('Adding interviewer, please wait..')

      this.isLoadingToggle(true)

      // Create or Update
      try {
        const { data } = await createOrUpdate({ id, clientId, name, email, mobile })

        if(data.errors && !isEmpty(data.errors)) {
          messageShow(data.errors[0].message)
        } else {
          // Update interviewers list
          successCallback(false)

          // Reset form data
          this.reset()

          if(!isEmpty(id)) {
            messageShow('Interviewer updated successfully.')
          } else {
            messageShow('Interviewer added successfully.')
          }
        }
      } catch(error) {
        messageShow('There was some error. Please try again.')
      } finally {
        this.isLoadingToggle(false)
      }
    } else {
      messageShow('Please enter interviewer name.')
    }
  }

  render() {
    const { classes, clients, elevation, clientSelectionHide } = this.props
    const { isLoading, id, clientId, name, email, mobile } = this.state

    return (
      <Paper elevation={elevation} className={classes.formContainer}>
        <Typography
          variant={'subheading'}
          color={'inherit'}
        >
          { id === '' ? `Add new interviewer` : `Edit interviewer` }
        </Typography>

        <form onSubmit={this.save}>
          {/* Input - name */}
          <Grid item xs={12}>
            <TextField
              name={'name'}
              value={nullToEmptyString(name)}
              onChange={this.onType}
              label={'Name'}
              placeholder={'Enter interviewer name'}
              required={true}
              margin={'normal'}
              autoComplete={'off'}
              fullWidth
              autoFocus
            />
          </Grid>

          {/* Input - client */}
          {
            !clientSelectionHide &&
            <Grid item xs={12}>
              <FormControl
                style={{ marginTop: 10 }}
                fullWidth
                required={true}
              >
                <InputLabel htmlFor="client-id">Client</InputLabel>
                <Select
                  value={nullToEmptyString(clientId)}
                  onChange={this.onType}
                  inputProps={{
                    id: 'client-id',
                    name: 'clientId',
                    required: 'required'
                  }}
                >
                  <MenuItem value="">
                    <em>Select client</em>
                  </MenuItem>
                  {
                    clients.isLoading
                      ? <Loading />
                      : clients.list && clients.list.length > 0
                      ? clients.list.map(client => (
                        <MenuItem key={client._id} value={client._id}>{ client.name }</MenuItem>
                      ))
                      : <MenuItem value="">
                        <em>No client added.</em>
                      </MenuItem>
                  }
                </Select>
              </FormControl>
            </Grid>
          }

          {/* Input - email */}
          <Grid item xs={12}>
            <TextField
              name={'email'}
              type={'email'}
              value={nullToEmptyString(email)}
              onChange={this.onType}
              label={'Email'}
              placeholder={'Enter interviewer email'}
              required={true}
              margin={'normal'}
              autoComplete={'off'}
              fullWidth
            />
          </Grid>

          {/* Input - mobile */}
          <Grid item xs={12}>
            <TextField
              name={'mobile'}
              value={nullToEmptyString(mobile)}
              onChange={this.onType}
              label={'Mobile'}
              placeholder={'Enter interviewer mobile'}
              required={true}
              margin={'normal'}
              autoComplete={'off'}
              fullWidth
            />
          </Grid>

          {/* Button -  Save */}
          <Grid item xs={12} className={classes.buttonsContainer}>
            {
              id !== '' &&
              <Tooltip title={'Cancel'} placement={'bottom'} enterDelay={500}>
                <Zoom in={true}>
                  <IconButton
                    aria-label={'Cancel'}
                    onClick={this.reset}
                  >
                    <IconClose />
                  </IconButton>
                </Zoom>
              </Tooltip>
            }

            <Tooltip title={'Save'} placement={'bottom'} enterDelay={500}>
              <IconButton
                type={'submit'}
                aria-label={'Save'}
                color={'primary'}
                disabled={isLoading}
              >
                <IconCheck />
              </IconButton>
            </Tooltip>
          </Grid>
        </form>
      </Paper>
    )
  }
}

// Component Properties
CreateOrEdit.propTypes = {
  elevation: PropTypes.number.isRequired,
  clientId: PropTypes.string.isRequired,
  clientShowLoading: PropTypes.bool.isRequired,
  successCallback: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  interviewerEdit: PropTypes.object.isRequired,
  clients: PropTypes.object.isRequired,
  createOrUpdate: PropTypes.func.isRequired,
  editClose: PropTypes.func.isRequired,
  getClientList: PropTypes.func.isRequired,
  messageShow: PropTypes.func.isRequired
}
CreateOrEdit.defaultProps = {
  elevation: 1,
  clientId: '',
  clientShowLoading: true,
  clientSelectionHide: false
}

// Component State
function createOrEditState(state) {
  return {
    interviewerEdit: state.interviewerEdit,
    clients: state.clients
  }
}

export default connect(createOrEditState, { createOrUpdate, editClose, getClientList, messageShow })(withStyles(styles)(CreateOrEdit))
