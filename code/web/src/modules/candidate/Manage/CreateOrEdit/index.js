// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import isEmpty from 'lodash/isEmpty'

// UI Imports
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
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
import { upload } from '../../../common/api/actions'
import { getList as getProjectList } from '../../../project/api/actions/query'
import { getListByProject as getJobListByProject } from '../../../job/api/actions/query'
import { createOrUpdate, editClose } from '../../api/actions/mutation'
import { messageShow } from '../../../common/api/actions'
import Loading from '../../../common/Loading'

// Component
class CreateOrEdit extends PureComponent {
  constructor(props) {
    super(props)

    this.project = {
      id: '',
      projectId: props.projectId,
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
      isUploadingFile: false,

      ...this.project
    }
  }

  componentDidMount() {
    const { getProjectList, projectShowLoading, getJobListByProject, projectId } = this.props

    getProjectList(projectShowLoading)

    if(!isEmpty(projectId)) {
      getJobListByProject({ projectId })
    }
  }

  componentWillReceiveProps(nextProps) {
    const { candidate } = nextProps.candidateEdit

    if(candidate && candidate._id !== this.state.id) {
      this.setState({
        id: candidate._id,
        projectId: candidate.projectId._id,
        jobId: candidate.jobId ? candidate.jobId._id : '',
        name: candidate.name,
        email: candidate.email,
        mobile: candidate.mobile,
        experience: candidate.experience,
        resume: candidate.resume,
        salaryCurrent: candidate.salaryCurrent,
        salaryExpected: candidate.salaryExpected
      })


      const { getJobListByProject } = this.props

      getJobListByProject({ projectId: candidate.projectId._id })
    }
  }

  isLoadingToggle = isLoading => {
    this.setState({
      isLoading
    })
  }

  isUploadingFileToggle = isUploadingFile => {
    this.setState({
      isUploadingFile
    })
  }

  onType = event => {
    this.setState({
      [event.target.name]: event.target.value
    })

    if(event.target.name === 'projectId' && event.target.value) {
      const { getJobListByProject } = this.props

      getJobListByProject({ projectId: event.target.value })
    }
  }

  reset = () => {
    const { editClose } = this.props

    this.setState({
      ...this.project
    })

    editClose()
  }

  save = async event => {
    event.preventDefault()

    const { createOrUpdate, successCallback, messageShow } = this.props

    const { id, projectId, jobId, name, email, mobile, experience, resume, salaryCurrent, salaryExpected } = this.state

    // Validate
    if(!isEmpty(projectId) && !isEmpty(name) && !isEmpty(email) && !isEmpty(mobile) && !isEmpty(experience)) {
      if(!isEmpty(resume)) {
        messageShow('Adding candidate, please wait..')

        this.isLoadingToggle(true)

        // Create or Update
        try {
          const { data } = await createOrUpdate({ id, projectId, jobId, name, email, mobile, experience, resume, salaryCurrent, salaryExpected })

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
        messageShow('Please upload resume.')
      }
    } else {
      messageShow('Please enter all the required information.')
    }
  }

  onUpload = async event => {
    const { upload, messageShow } = this.props

    messageShow('Uploading file, please wait...')

    this.isUploadingFileToggle(true)

    let file = new FormData()
    file.append('file', event.target.files[0])

    // Upload image
    try {
      const { data } = await upload(file)

      if(data.success) {
        this.props.messageShow('File uploaded successfully.')

        this.setState({
          resume: data.file
        })
      } else {
        messageShow('There was some error. Please try again.')
      }
    } catch(error) {
      messageShow('There was some error. Please try again.')
    } finally {
      this.isUploadingFileToggle(false)
    }
  }

  render() {
    const { classes, projects, elevation, projectSelectionHide, jobsByProject } = this.props
    const { isLoading, id, projectId, jobId, name, email, mobile, experience, resume, salaryCurrent, salaryExpected, isUploadingFile } = this.state

    return (
      <Paper elevation={elevation} className={classes.formContainer}>
        <Typography
          variant={'subtitle1'}
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

          {/* Input - project */}
          {
            !projectSelectionHide &&
            <Grid item xs={12}>
              <FormControl
                style={{marginTop: 10}}
                fullWidth
                required={true}
              >
                <InputLabel htmlFor="project-id">Project</InputLabel>
                <Select
                  value={nullToEmptyString(projectId)}
                  onChange={this.onType}
                  inputProps={{
                    id: 'project-id',
                    name: 'projectId',
                    required: true
                  }}
                >
                  <MenuItem value="">
                    <em>Select project</em>
                  </MenuItem>
                  {
                    projects.isLoading
                      ? <Loading/>
                      : projects.list && projects.list.length > 0
                        ? projects.list.map(project => (
                            <MenuItem key={project._id} value={project._id}>{project.name}</MenuItem>
                          ))
                        : <MenuItem value="">
                            <em>No project added.</em>
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
            <input
              accept={'application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document'}
              style={{ display: 'none' }}
              id={'contained-button-file'}
              type={'file'}
              onChange={this.onUpload}
            />

            <label htmlFor={'contained-button-file'}>
              <Button
                variant={'outlined'}
                component={'span'}
                type={'file'}
                required={id === ''}
                fullWidth
                className={classes.buttonUpload}
                disabled={isUploadingFile}
              >
                { resume ? <React.Fragment><IconCheck className={classes.buttonIcon} /> Resume Uploaded</React.Fragment> : 'Upload Resume' }
              </Button>
            </label>
          </Grid>

          {/* Input - job */}
          <Grid item xs={12}>
            <FormControl
              style={{marginTop: 10}}
              fullWidth
            >
              <InputLabel htmlFor={'job-id'}>Job role</InputLabel>
              <Select
                value={nullToEmptyString(jobId)}
                onChange={this.onType}
                inputProps={{
                  id: 'job-id',
                  name: 'jobId'
                }}
              >
                <MenuItem value="">
                  <em>Select job role</em>
                </MenuItem>
                {
                  jobsByProject.isLoading
                    ? <Loading/>
                    : jobsByProject.list && jobsByProject.list.length > 0
                        ? jobsByProject.list.map(job => (
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
            <Grid container spacing={6}>
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
  projectId: PropTypes.string.isRequired,
  projectShowLoading: PropTypes.bool.isRequired,
  successCallback: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  candidateEdit: PropTypes.object.isRequired,
  createOrUpdate: PropTypes.func.isRequired,
  editClose: PropTypes.func.isRequired,
  getProjectList: PropTypes.func.isRequired,
  getJobListByProject: PropTypes.func.isRequired,
  upload: PropTypes.func.isRequired,
  messageShow: PropTypes.func.isRequired
}
CreateOrEdit.defaultProps = {
  elevation: 1,
  projectId: '',
  projectShowLoading: true,
  projectSelectionHide: false
}

// Component State
function createOrEditState(state) {
  return {
    candidateEdit: state.candidateEdit,
    projects: state.projects,
    jobsByProject: state.jobsByProject
  }
}

export default connect(createOrEditState, { createOrUpdate, editClose, getProjectList, getJobListByProject, upload, messageShow })(withStyles(styles)(CreateOrEdit))
