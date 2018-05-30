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
import IconButton from '@material-ui/core/IconButton'
import IconCheck from '@material-ui/icons/Check'
import IconClose from '@material-ui/icons/Close'
import Zoom from '@material-ui/core/Zoom'
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'

// App Imports
import { nullToEmptyString } from '../../../../setup/helpers'
import { createOrUpdate, getList } from '../../api/actions'
import { messageShow } from '../../../common/api/actions'

// Component
class CreateOrEdit extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: false,

      id: '',
      name: '',
      email: '',
      mobile: '',
      experience: '',
      resume: '',
      salaryCurrent: '',
      salaryExpected: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    const { candidate } = nextProps.candidateEdit

    if(candidate._id !== this.state.id) {
      this.setState({
        id: candidate._id,
        name: candidate.name,
        email: candidate.email,
        mobile: candidate.mobile,
        experience: candidate.experience,
        resume: candidate.resume,
        salaryCurrent: candidate.salaryCurrent,
        salaryExpected: candidate.salaryExpected
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
      id: '',
      name: '',
      email: '',
      mobile: '',
      experience: '',
      resume: '',
      salaryCurrent: '',
      salaryExpected: ''
    })
  }

  save = (event) => {
    event.preventDefault()

    const { createOrUpdate, getList, messageShow } = this.props

    const { id, name, email, mobile, experience, resume, salaryCurrent, salaryExpected } = this.state

    // Validate
    if(!isEmpty(name) && !isEmpty(email) && !isEmpty(mobile) && !isEmpty(experience) && !isEmpty(resume) && !isEmpty(salaryCurrent) && !isEmpty(salaryExpected)) {
      messageShow('Adding candidate, please wait..')

      this.isLoadingToggle(true)

      // Create or Update
      createOrUpdate({ id, name, email, mobile, experience, resume, salaryCurrent, salaryExpected })
        .then(response => {
          if(response.data.errors && !isEmpty(response.data.errors)) {
            messageShow(response.data.errors[0].message)
          } else {
            // Update candidates list
            getList(false)

            // Reset form data
            this.reset()

            if(!isEmpty(id)) {
              messageShow('Candidate updated successfully.')
            } else {
              messageShow('Candidate added successfully.')
            }
          }
        })
        .catch(() => {
          messageShow('There was some error. Please try again.')
        })
        .finally(() => {
          this.isLoadingToggle(false)
        })
    } else {
      messageShow('Please enter candidate name.')
    }
  }

  render() {
    const { classes } = this.props
    const { isLoading, id, name, email, mobile, experience, resume, salaryCurrent, salaryExpected } = this.state

    return (
      <Paper elevation={1} className={classes.formContainer}>
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
              label={'Candidate Name'}
              placeholder={'Enter name'}
              required={true}
              margin={'normal'}
              autoComplete={'off'}
              fullWidth
            />
          </Grid>

          {/* Input - email */}
          <Grid item xs={12}>
            <TextField
              name={'email'}
              type={'email'}
              value={nullToEmptyString(email)}
              onChange={this.onType}
              label={'Candidate email'}
              placeholder={'Enter email'}
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
              value={nullToEmptyString(experience)}
              onChange={this.onType}
              label={'Candidate experience'}
              placeholder={'Enter experience'}
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
              label={'Candidate resume'}
              placeholder={'Enter resume'}
              required={true}
              margin={'normal'}
              autoComplete={'off'}
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={24}>
              {/* Input - salaryCurrent */}
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

              {/* Input - salaryExpected */}
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
            <Tooltip title={'Cancel'} placement={'bottom'} enterDelay={500}>
              <Zoom in={id !== ''}>
                <IconButton
                  aria-label={'Cancel'}
                  onClick={this.reset}
                >
                  <IconClose />
                </IconButton>
              </Zoom>
            </Tooltip>

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
  classes: PropTypes.object.isRequired,
  candidateEdit: PropTypes.object.isRequired,
  createOrUpdate: PropTypes.func.isRequired,
  getList: PropTypes.func.isRequired,
  messageShow: PropTypes.func.isRequired
}

// Component State
function createOrEditState(state) {
  return {
    candidateEdit: state.candidateEdit
  }
}

export default connect(createOrEditState, { createOrUpdate, getList, messageShow })(withStyles(styles)(CreateOrEdit))
