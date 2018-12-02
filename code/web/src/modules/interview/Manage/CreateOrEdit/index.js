// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import isEmpty from 'lodash/isEmpty'
import Datetime from 'react-datetime'
import moment from 'moment'

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
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import IconButton from '@material-ui/core/IconButton'
import IconCheck from '@material-ui/icons/Check'
import IconClose from '@material-ui/icons/Close'
import Zoom from '@material-ui/core/Zoom'
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'

// App Imports
import params from '../../../../setup/config/params'
import { nullToEmptyString } from '../../../../setup/helpers'
import { getListByProject as getCandidateListByProject } from '../../../candidate/api/actions/query'
import { getListByProject as getInterviewListByProject } from '../../../interviewer/api/actions/query'
import { createOrUpdate, editClose } from '../../api/actions/mutation'
import { messageShow } from '../../../common/api/actions'
import Loading from '../../../common/Loading'

// Component
class CreateOrEdit extends PureComponent {
  constructor(props) {
    super(props)

    const { projectId, user } = props

    this.interview = {
      id: '',
      projectId: projectId,
      candidateId: '',
      interviewerId: '',
      dateTime: this.defaultDate(),
      mode: '',
      note: '',
      invite: !user.details.demo,
    }

    this.state = {
      isLoading: false,

      ...this.interview
    }
  }

  componentDidMount() {
    const { getCandidateListByProject, getInterviewListByProject, projectId } = this.props

    getCandidateListByProject({ projectId })
    getInterviewListByProject({ projectId })
  }

  componentWillReceiveProps(nextProps) {
    const { interview } = nextProps.interviewEdit

    console.log(interview)

    if(interview && interview._id !== this.state.id) {
      this.setState({
        id: interview._id,
        projectId: interview.projectId._id,
        candidateId: interview.candidateId._id,
        interviewerId: interview.interviewerId._id,
        dateTime: moment(new Date(interview.dateTime)),
        mode: interview.mode,
        note: interview.note
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
      ...this.interview
    })

    editClose()
  }

  save = async event => {
    event.preventDefault()

    const { createOrUpdate, successCallback, messageShow } = this.props

    const { id, projectId, candidateId, interviewerId, dateTime, mode, note, invite } = this.state

    // Validate
    if(!isEmpty(projectId) && !isEmpty(candidateId) && !isEmpty(interviewerId)) {
      messageShow('Adding interviewer, please wait..')

      this.isLoadingToggle(true)

      // Create or Update
      try {
        const { data } = await createOrUpdate({ id, projectId, candidateId, interviewerId, dateTime: dateTime.format(), mode, note, invite })

        if(data.errors && data.errors.length > 0) {
          messageShow(data.errors[0].message)
        } else {
          // Update interviewers list
          successCallback(false)

          // Reset form data
          this.reset()

          if(!isEmpty(id)) {
            messageShow('Interview updated successfully.')
          } else {
            messageShow('Interview added successfully.')
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

  onDateSelect = (dateTime) => {
    this.setState({
      dateTime
    })
  }

  defaultDate = () => {
    return moment()
      .add(1, 'day')
      .hours(9).minutes(0).seconds(0)
  }

  onCheck = name => event => {
    this.setState({ [name]: event.target.checked })
  }

  render() {
    const { classes, elevation, candidatesByProject, interviewersByProject, user } = this.props
    const { isLoading, id, candidateId, interviewerId, dateTime, mode, note, invite } = this.state

    return (
      <Paper elevation={elevation} className={classes.formContainer}>
        <Typography
          variant={'subtitle1'}
          color={'inherit'}
        >
          { id === '' ? `Schedule an interview` : `Edit interview` }
        </Typography>

        <form onSubmit={this.save}>

          {/* Input - candidate */}
          <Grid item xs={12}>
            <FormControl
              style={{ marginTop: 10 }}
              fullWidth
              required={true}
            >
              <InputLabel htmlFor="candidate-id">Candidate</InputLabel>
              <Select
                value={nullToEmptyString(candidateId)}
                onChange={this.onType}
                inputProps={{
                  id: 'candidate-id',
                  name: 'candidateId',
                  required: true
                }}
              >
                <MenuItem value="">
                  <em>Select candidate</em>
                </MenuItem>
                {
                  candidatesByProject.isLoading
                    ? <Loading />
                    : candidatesByProject.list && candidatesByProject.list.length > 0
                        ? candidatesByProject.list.map(candidate => (
                            <MenuItem key={candidate._id} value={candidate._id}>{ candidate.name }</MenuItem>
                          ))
                        : <MenuItem value="">
                            <em>No candidate added.</em>
                          </MenuItem>
                }
              </Select>
            </FormControl>
          </Grid>

          {/* Input - interviewer */}
          <Grid item xs={12}>
            <FormControl
              style={{ marginTop: 10 }}
              fullWidth
              required={true}
            >
              <InputLabel htmlFor="interviewer-id">Interviewer</InputLabel>
              <Select
                value={nullToEmptyString(interviewerId)}
                onChange={this.onType}
                inputProps={{
                  id: 'interviewer-id',
                  name: 'interviewerId',
                  required: true
                }}
              >
                <MenuItem value="">
                  <em>Select interviewer</em>
                </MenuItem>
                {
                  interviewersByProject.isLoading
                    ? <Loading />
                    : interviewersByProject.list && interviewersByProject.list.length > 0
                        ? interviewersByProject.list.map(interviewer => (
                            <MenuItem key={interviewer._id} value={interviewer._id}>{ interviewer.name }</MenuItem>
                          ))
                        : <MenuItem value="">
                            <em>No interviewer added.</em>
                          </MenuItem>
                }
              </Select>
            </FormControl>
          </Grid>

          {/* Input - dateTime */}
          <Grid item xs={12}>
            <Datetime
              onChange={this.onDateSelect}
              value={dateTime ? dateTime.format(`${ params.date.format.date } ${ params.date.format.time }`) : '' }
              dateFormat={params.date.format.date}
              timeFormat={params.date.format.time}
              renderInput={
                (props) => {
                  return (
                    <TextField
                      {...props}
                      label={'Date and time'}
                      placeholder={'Select date and time'}
                      margin={'normal'}
                      autoComplete={'off'}
                      fullWidth
                      inputProps={{ readOnly: true }}
                    />
                  );
                }
              }
            />
          </Grid>

          {/* Input - mode */}
          <Grid item xs={12}>
            <FormControl
              style={{ marginTop: 10 }}
              fullWidth
              required={true}
            >
              <InputLabel htmlFor="mode-id">Mode</InputLabel>
              <Select
                value={nullToEmptyString(mode)}
                onChange={this.onType}
                inputProps={{
                  id: 'mode-id',
                  name: 'mode',
                  required: true
                }}
              >
                <MenuItem value="">
                  <em>Select mode</em>
                </MenuItem>
                {
                  params.interview.modes.map(mode => (
                    <MenuItem key={mode.key} value={mode.key}>{ mode.name }</MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </Grid>

          {/* Input - note */}
          <Grid item xs={12}>
            <TextField
              name={'note'}
              value={nullToEmptyString(note)}
              onChange={this.onType}
              label={'Note'}
              placeholder={'Enter note (eg: video/audio chat URL, address, directions, important points, etc.)'}
              margin={'normal'}
              autoComplete={'off'}
              rowsMax={6}
              rows={3}
              multiline
              fullWidth
            />
          </Grid>

          {/* Input - send email invite */}
          <Grid item xs={12}>
            <FormGroup row title={!user.details.demo ? 'A calender invite will be sent to candidate and interviewer via email.' : 'This feature is not available for demo users.'}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={invite}
                    onChange={this.onCheck('invite')}
                    color={'default'}
                  />
                }
                label={'Send email invite'}
                disabled={user.isAuthenticated && user.details.demo}
              />
            </FormGroup>
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
  projectId: PropTypes.string.isRequired,
  successCallback: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  interviewEdit: PropTypes.object.isRequired,
  candidatesByProject: PropTypes.object.isRequired,
  interviewersByProject: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  createOrUpdate: PropTypes.func.isRequired,
  editClose: PropTypes.func.isRequired,
  getCandidateListByProject: PropTypes.func.isRequired,
  getInterviewListByProject: PropTypes.func.isRequired,
  messageShow: PropTypes.func.isRequired
}
CreateOrEdit.defaultProps = {
  elevation: 1,
  projectShowLoading: true
}

// Component State
function createOrEditState(state) {
  return {
    interviewEdit: state.interviewEdit,
    candidatesByProject: state.candidatesByProject,
    interviewersByProject: state.interviewersByProject,
    user: state.user
  }
}

export default connect(createOrEditState, { createOrUpdate, editClose, getCandidateListByProject, getInterviewListByProject, messageShow })(withStyles(styles)(CreateOrEdit))
