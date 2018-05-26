// Imports
import React, { Component } from 'react'
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
import { nullToEmptyString } from '../../../../setup/helpers'
import { getByUser as getOrganization, update as updateOrganization } from '../../api/actions'
import { messageShow } from '../../../common/api/actions'
import Loading from '../../../common/Loading'

// Component
class Details extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: false,
      isLoadingSubmit: false,

      name: '',
      description: '',
      domain: ''
    }
  }

  componentDidMount() {
    this.refresh()
  }

  refresh = (isLoading = true) => {
    const { getOrganization, messageShow } = this.props

    this.isLoadingToggle(isLoading)

    getOrganization()
      .then(response => {
        if (response.data.errors && response.data.errors.length > 0) {
          messageShow(response.data.errors[0].message)
        } else {
          this.setData(response.data.data.organizationByUser)
        }
      })
      .catch(() => {
        messageShow('There was some error. Please try again.')
      })
      .finally(() => {
        this.isLoadingToggle(false)
      })
  }

  setData = ({ name, description, domain }) => {
    this.setState({
      name,
      description,
      domain
    })
  }

  isLoadingToggle = isLoading => {
    this.setState({
      isLoading
    })
  }

  isLoadingSubmitToggle = isLoadingSubmit => {
    this.setState({
      isLoadingSubmit
    })
  }

  update = event => {
    event.preventDefault()

    const { updateOrganization, messageShow } = this.props
    const { name } = this.state

    // Validate
    if(!isEmpty(name)) {
      messageShow('Adding client, please wait..')

      this.isLoadingSubmitToggle(true)

      const { name, description, domain } = this.state

      // Update
      updateOrganization({ name, description, domain })
        .then(response => {
          if(response.data.errors && !isEmpty(response.data.errors)) {
            messageShow(response.data.errors[0].message)
          } else {
            // Refresh details, silently
            this.refresh(false)

            messageShow('Organization details updated successfully.')
          }
        })
        .catch(() => {
          messageShow('There was some error. Please try again.')
        })
        .finally(() => {
          this.isLoadingSubmitToggle(false)
        })
    } else {
      messageShow('Please enter organization name.')
    }
  }

  onType = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    const { classes } = this.props
    const { isLoading, isLoadingSubmit, name, description, domain } = this.state

    return (
      <div>
        {
          isLoading
            ? <Loading />
            : <form onSubmit={this.update}>
                <Grid container>
                  <Grid item xs={12} md={6}>
                    {/* Input - Organization name */}
                    <Grid item xs={12}>
                      <TextField
                        name={'name'}
                        value={nullToEmptyString(name)}
                        onChange={this.onType}
                        label={'Organization name'}
                        placeholder={'Enter name (eg: HireSmart)'}
                        required={true}
                        margin={'normal'}
                        autoComplete={'off'}
                        style={{ marginTop: 0 }}
                        fullWidth
                        autoFocus
                      />
                    </Grid>

                    {/* Input - Organization description */}
                    <Grid item xs={12}>
                      <TextField
                        name={'description'}
                        value={nullToEmptyString(description)}
                        onChange={this.onType}
                        label={'Organization description'}
                        placeholder={'Enter description (eg: HireSmart is a platform to streamline hiring process, scheduling interviews and tracking candidates.)'}
                        margin={'normal'}
                        autoComplete={'off'}
                        rowsMax={3}
                        rows={1}
                        multiline
                        fullWidth
                      />
                    </Grid>

                    {/* Input - Organization domain */}
                    <Grid item xs={12}>
                      <TextField
                        name={'domain'}
                        value={nullToEmptyString(domain)}
                        onChange={this.onType}
                        label={'Organization website domain'}
                        placeholder={'Enter website domain (eg: hiresmart.com)'}
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
                        disabled={isLoadingSubmit}
                      >
                        <IconCheck />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Grid>
              </form>
        }
      </div>
    )
  }
}

// Component Properties
Details.propTypes = {
  classes: PropTypes.object.isRequired,
  getOrganization: PropTypes.func.isRequired,
  updateOrganization: PropTypes.func.isRequired,
  messageShow: PropTypes.func.isRequired
}

export default connect(null, { getOrganization, updateOrganization, messageShow })(withStyles(styles)(Details))
