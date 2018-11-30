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

    this.job = {
      id: '',
      projectId: props.projectId,
      role: '',
      description: ''
    }

    this.state = {
      isLoading: false,

      ...this.job
    }
  }

  componentDidMount() {
    const { getProjectList, projectShowLoading } = this.props

    getProjectList(projectShowLoading)
  }

  componentWillReceiveProps(nextProps) {
    const { job } = nextProps.jobEdit

    if(job && job._id !== this.state.id) {
      this.setState({
        id: job._id,
        projectId: job.projectId,
        role: job.role,
        description: job.description
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
      ...this.job
    })

    editClose()
  }

  save = async event => {
    event.preventDefault()

    const { createOrUpdate, successCallback, messageShow } = this.props

    const { id, projectId, role, description } = this.state

    // Validate
    if(!isEmpty(role)) {
      messageShow('Adding job, please wait..')

      this.isLoadingToggle(true)

      // Create or Update
      try {
        const { data } = await createOrUpdate({ id, projectId, role, description })

        if(data.errors && data.errors.length > 0) {
          messageShow(data.errors[0].message)
        } else {
          // Update jobs list
          successCallback(false)

          // Reset form data
          this.reset()

          if(!isEmpty(id)) {
            messageShow('Job updated successfully.')
          } else {
            messageShow('Job added successfully.')
          }
        }
      } catch(error) {
        messageShow('There was some error. Please try again.')
      } finally {
        this.isLoadingToggle(false)
      }
    } else {
      messageShow('Please enter job role.')
    }
  }

  render() {
    const { classes, projects, elevation, projectSelectionHide } = this.props
    const { isLoading, id, projectId, role, description } = this.state

    return (
      <Paper elevation={elevation} className={classes.formContainer}>
        <Typography
          variant={'subtitle1'}
          color={'inherit'}
        >
          { id === '' ? `Add new job` : `Edit job` }
        </Typography>

        <form onSubmit={this.save}>
          {/* Input - role */}
          <Grid item xs={12}>
            <TextField
              name={'role'}
              value={nullToEmptyString(role)}
              onChange={this.onType}
              label={'Role'}
              placeholder={'Enter job role (eg: Software Engineer)'}
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

          {/* Input - description */}
          <Grid item xs={12}>
            <TextField
              name={'description'}
              value={nullToEmptyString(description)}
              onChange={this.onType}
              label={'Description'}
              placeholder={'Enter job description or skills (eg: Java)'}
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
  jobEdit: PropTypes.object.isRequired,
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
    jobEdit: state.jobEdit,
    projects: state.projects
  }
}

export default connect(createOrEditState, { createOrUpdate, editClose, getProjectList, messageShow })(withStyles(styles)(CreateOrEdit))
