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
import { getList as getProjectList } from '../../../project/api/actions/query'
import { createOrUpdate, editClose } from '../../api/actions/mutation'
import { messageShow } from '../../../common/api/actions'
import Loading from '../../../common/Loading'

// Component
class CreateOrEdit extends PureComponent {
  constructor(props) {
    super(props)

    this.interviewer = {
      id: '',
      projectId: props.projectId,
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
    const { getProjectList, projectShowLoading } = this.props

    getProjectList(projectShowLoading)
  }

  componentWillReceiveProps(nextProps) {
    const { interviewer } = nextProps.interviewerEdit

    if(interviewer && interviewer._id !== this.state.id) {
      this.setState({
        id: interviewer._id,
        projectId: interviewer.projectId._id,
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

    const { id, projectId, name, email, mobile } = this.state

    // Validate
    if(!isEmpty(name) && !isEmpty(projectId) && !isEmpty(email) && !isEmpty(mobile)) {
      messageShow('Adding interviewer, please wait..')

      this.isLoadingToggle(true)

      // Create or Update
      try {
        const { data } = await createOrUpdate({ id, projectId, name, email, mobile })

        if(data.errors && data.errors.length > 0) {
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
      messageShow('Please enter all the required information.')
    }
  }

  render() {
    const { classes, projects, elevation, projectSelectionHide } = this.props
    const { isLoading, id, projectId, name, email, mobile } = this.state

    return (
      <Paper elevation={elevation} className={classes.formContainer}>
        <Typography
          variant={'subtitle1'}
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

          {/* Input - project */}
          {
            !projectSelectionHide &&
            <Grid item xs={12}>
              <FormControl
                style={{ marginTop: 10 }}
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
                      ? <Loading />
                      : projects.list && projects.list.length > 0
                      ? projects.list.map(project => (
                        <MenuItem key={project._id} value={project._id}>{ project.name }</MenuItem>
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
  projectId: PropTypes.string.isRequired,
  projectShowLoading: PropTypes.bool.isRequired,
  successCallback: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  interviewerEdit: PropTypes.object.isRequired,
  projects: PropTypes.object.isRequired,
  createOrUpdate: PropTypes.func.isRequired,
  editClose: PropTypes.func.isRequired,
  getProjectList: PropTypes.func.isRequired,
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
    interviewerEdit: state.interviewerEdit,
    projects: state.projects
  }
}

export default connect(createOrEditState, { createOrUpdate, editClose, getProjectList, messageShow })(withStyles(styles)(CreateOrEdit))
