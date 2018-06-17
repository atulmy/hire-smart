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
import { getListByClient as getJobListByClient } from '../../../job/api/actions/query'
import { createOrUpdate, editClose } from '../../api/actions/mutation'
import { messageShow } from '../../../common/api/actions'
import Loading from '../../../common/Loading'

// Component
class CreateOrEdit extends PureComponent {
  constructor(props) {
    super(props)

    this.client = {
      id: '',
      clientId: props.clientId,
      jobId: '',
      name: '',
      email: '',
      mobile: '',
      experience: '',
      resume: '',
      salaryCurrent: '',
      salaryExpected: ''
    }

    this.state = {
      isLoading: false,

      ...this.client
    }
  }

  componentDidMount() {
    const { getClientList, clientShowLoading, getJobListByClient, clientId } = this.props

    getClientList(clientShowLoading)

    if(!isEmpty(clientId)) {
      getJobListByClient({ clientId })
    }
  }

  componentWillReceiveProps(nextProps) {
    const { candidate } = nextProps.candidateEdit

    if(candidate && candidate._id !== this.state.id) {
      this.setState({
        id: candidate._id,
        clientId: candidate.clientId._id,
        jobId: candidate.jobId ? candidate.jobId._id : '',
        name: candidate.name,
        email: candidate.email,
        mobile: candidate.mobile,
        experience: candidate.experience,
        resume: candidate.resume,
        salaryCurrent: candidate.salaryCurrent,
        salaryExpected: candidate.salaryExpected
      })


      const { getJobListByClient } = this.props

      getJobListByClient({ clientId: candidate.clientId._id })
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

    if(event.target.name === 'clientId') {
      const { getJobListByClient } = this.props

      getJobListByClient({ clientId: event.target.value })
    }
  }

  reset = () => {
    const { editClose } = this.props

    this.setState({
      ...this.client
    })

    editClose()
  }

  save = async event => {
    event.preventDefault()

    const { createOrUpdate, successCallback, messageShow } = this.props

    const { id, clientId, jobId, name, email, mobile, experience, resume, salaryCurrent, salaryExpected } = this.state

    // Validate
    if(!isEmpty(clientId) && !isEmpty(name) && !isEmpty(email) && !isEmpty(mobile) && !isEmpty(experience) && !isEmpty(resume) && !isEmpty(salaryCurrent) && !isEmpty(salaryExpected)) {
      messageShow('Adding candidate, please wait..')

      this.isLoadingToggle(true)

      // Create or Update
      try {
        const { data } = await createOrUpdate({ id, clientId, jobId, name, email, mobile, experience, resume, salaryCurrent, salaryExpected })

        if(data.errors && data.errors.length > 0) {
          messageShow(data.errors[0].message)
        } else {
          // Update candidates list
          successCallback(false)

          // Reset form data
          this.reset()

          if(!isEmpty(id)) {
            messageShow('Candidate updated successfully.')
          } else {
            messageShow('Candidate added successfully.')
          }
        }
      } catch(error) {
        messageShow('There was some error. Please try again.')
      } finally {
        this.isLoadingToggle(false)
      }
    } else {
      messageShow('Please enter all the required information.')
    }
  }

  render() {
    const { classes, clients, elevation, clientSelectionHide, jobsByClient } = this.props
    const { isLoading, id, clientId, jobId, name, email, mobile, experience, resume, salaryCurrent, salaryExpected } = this.state

    return (
      <Paper elevation={elevation} className={classes.formContainer}>
        <Typography
          variant={'subheading'}
          color={'inherit'}
        >
          { id === '' ? `Add new candidate` : `Edit candidate` }
        </Typography>

        <form onSubmit={this.save}>
          {/* Input - name */}
          <Grid item xs={12}>
            <TextField
              name={'name'}
              value={nullToEmptyString(name)}
              onChange={this.onType}
              label={'Name'}
              placeholder={`Enter candidate's name`}
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
                style={{marginTop: 10}}
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
                      ? <Loading/>
                      : clients.list && clients.list.length > 0
                        ? clients.list.map(client => (
                            <MenuItem key={client._id} value={client._id}>{client.name}</MenuItem>
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
              placeholder={`Enter candidate's email`}
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
              label={'Candidate mobile'}
              placeholder={'Enter mobile'}
              required={true}
              margin={'normal'}
              autoComplete={'off'}
              fullWidth
            />
          </Grid>

          {/* Input - experience */}
          <Grid item xs={12}>
            <TextField
              name={'experience'}
              type={'number'}
              value={nullToEmptyString(experience)}
              onChange={this.onType}
              label={'Experience'}
              placeholder={`Enter candidate's experience in years`}
              required={true}
              margin={'normal'}
              autoComplete={'off'}
              fullWidth
            />
          </Grid>

          {/* Input - resume */}
          <Grid item xs={12}>
            <TextField
              name={'resume'}
              value={nullToEmptyString(resume)}
              onChange={this.onType}
              label={'Resume'}
              placeholder={'Upload candidate resume'}
              required={true}
              margin={'normal'}
              autoComplete={'off'}
              fullWidth
            />
          </Grid>

          {/* Input - job */}
          <Grid item xs={12}>
            <FormControl
              style={{marginTop: 10}}
              fullWidth
              disabled={jobsByClient.list.length === 0}
            >
              <InputLabel htmlFor="job-id">Job role</InputLabel>
              <Select
                value={nullToEmptyString(jobId)}
                onChange={this.onType}
                inputProps={{
                  id: 'job-id',
                  name: 'jobId',
                  required: 'required'
                }}
              >
                <MenuItem value="">
                  <em>Select job role</em>
                </MenuItem>
                {
                  jobsByClient.isLoading
                    ? <Loading/>
                    : jobsByClient.list && jobsByClient.list.length > 0
                    ? jobsByClient.list.map(job => (
                      <MenuItem key={job._id} value={job._id}>{job.role}</MenuItem>
                    ))
                    : <MenuItem value="">
                      <em>No job added.</em>
                    </MenuItem>
                }
              </Select>
            </FormControl>
          </Grid>

          {/* Input - Salary */}
          <Grid item xs={12}>
            <Grid container spacing={24}>
              {/* Input - Current */}
              <Grid item md={6}>
                <TextField
                  name={'salaryCurrent'}
                  value={nullToEmptyString(salaryCurrent)}
                  onChange={this.onType}
                  label={'Current salary'}
                  placeholder={'Enter current'}
                  margin={'normal'}
                  autoComplete={'off'}
                  fullWidth
                />
              </Grid>

              {/* Input - Expected */}
              <Grid item md={6}>
                <TextField
                  name={'salaryExpected'}
                  value={nullToEmptyString(salaryExpected)}
                  onChange={this.onType}
                  label={'Expected salary'}
                  placeholder={'Enter expected'}
                  margin={'normal'}
                  autoComplete={'off'}
                  fullWidth
                />
              </Grid>
            </Grid>
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
  candidateEdit: PropTypes.object.isRequired,
  createOrUpdate: PropTypes.func.isRequired,
  editClose: PropTypes.func.isRequired,
  getClientList: PropTypes.func.isRequired,
  getJobListByClient: PropTypes.func.isRequired,
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
    candidateEdit: state.candidateEdit,
    clients: state.clients,
    jobsByClient: state.jobsByClient
  }
}

export default connect(createOrEditState, { createOrUpdate, editClose, getClientList, getJobListByClient, messageShow })(withStyles(styles)(CreateOrEdit))
