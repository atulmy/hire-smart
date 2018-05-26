// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import isEmpty from 'validator/lib/isEmpty'

// UI Imports
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import IconCheck from '@material-ui/icons/Check'
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'

// App Imports
import { get as getOrganization, update as updateOrganization } from '../../api/actions'
import { messageShow } from '../../../common/api/actions'
import Loading from '../../../common/Loading'

// Component
class Details extends PureComponent {
  constructor() {
    super()

    this.state = {
      isLoading: false,

      name: '',
      description: '',
      domain: ''
    }
  }

  componentDidMount() {
    const { getOrganization } = this.props

    getOrganization()
  }

  isLoadingToggle = isLoading => {
    this.setState({
      isLoading
    })
  }

  update = event => {
    event.preventDefault()

    const { updateOrganization, messageShow } = this.props
    const { name } = this.state

    // Validate
    if(!isEmpty(name)) {
      messageShow('Adding client, please wait..')

      this.isLoadingToggle(true)

      // Create
      updateOrganization({ name })
        .then(response => {
          if(response.data.errors && !isEmpty(response.data.errors)) {
            messageShow(response.data.errors[0].message)
          } else {
            // Refresh client list
            getClientsList(false)

            // Hide create client form
            this.visibleToggle(false)

            messageShow('Client added successfully.')
          }
        })
        .catch(() => {
          messageShow('There was some error. Please try again.')
        })
        .finally(() => {
          this.isLoadingToggle(false)
        })
    } else {
      messageShow('Please enter client name.')
    }
  }

  onType = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    const { classes, isLoading, organization } = this.props
    const { name, description, domain } = this.state

    console.log(organization)

    return (
      <div>
        <form onSubmit={this.update}>
          <Grid container>
            <Grid item xs={12} md={6}>
              {/* Input - Organization name */}
              <Grid item xs={12}>
                <TextField
                  name={'name'}
                  value={name}
                  onChange={this.onType}
                  label={'Organization name'}
                  placeholder={'Enter name (eg: HireSmart)'}
                  required={true}
                  margin={'none'}
                  autoComplete={'off'}
                  fullWidth
                  autoFocus
                />
              </Grid>

              {/* Input - Organization description */}
              <Grid item xs={12}>
                <TextField
                  name={'description'}
                  value={description}
                  onChange={this.onType}
                  label={'Organization description'}
                  placeholder={'Enter description (eg: HireSmart is a platform to streamline hiring process, scheduling interviews and tracking candidates.)'}
                  margin={'normal'}
                  autoComplete={'off'}
                  rowsMax={3}
                  rows={2}
                  multiline
                  fullWidth
                />
              </Grid>

              {/* Input - Organization domain */}
              <Grid item xs={12}>
                <TextField
                  name={'domain'}
                  value={domain}
                  onChange={this.onType}
                  label={'Organization domain'}
                  placeholder={'Enter domain (eg: hiresmart.com)'}
                  margin={'normal'}
                  autoComplete={'off'}
                  fullWidth
                />
              </Grid>

              {/* Button -  Save */}
              <Grid item xs={12} className={classes.buttonsContainer}>
                <IconButton
                  type={'submit'}
                  aria-label={'Save'}
                  color={'primary'}
                  disabled={isLoading}
                >
                  <IconCheck />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </div>
    )
  }
}

// Component Properties
Details.propTypes = {
  classes: PropTypes.object.isRequired,
  organization: PropTypes.object.isRequired,
  getOrganization: PropTypes.func.isRequired,
  updateOrganization: PropTypes.func.isRequired,
  messageShow: PropTypes.func.isRequired
}

// Component State
function detailsState(state) {
  return {
    organization: state.organization
  }
}

export default connect(detailsState, { getOrganization, updateOrganization, messageShow })(withStyles(styles)(Details))
