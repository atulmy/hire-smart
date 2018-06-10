// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import isEmpty from 'validator/lib/isEmpty'

// UI Imports
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import IconClose from '@material-ui/icons/Close'
import IconCheck from '@material-ui/icons/Check'
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'

// App Imports
import { messageShow } from '../../../common/api/actions'
import { getList as getClientsList } from '../../../client/api/actions/query'
import { create as createClient } from '../../../client/api/actions/mutation'

// Component
class Quick extends PureComponent {
  constructor() {
    super()

    this.state = {
      visible: false,
      isLoading: false,
      name: '',
    }
  }

  create = (event) => {
    event.preventDefault()

    const { createClient, getClientsList, messageShow } = this.props
    const { name } = this.state

    // Validate
    if(!isEmpty(name)) {
      messageShow('Adding client, please wait..')

      this.isLoadingToggle(true)

      // Create
      createClient({ name })
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

  visibleToggle = (visible) => {
    this.setState({
      visible
    })

    if(!visible) {
      this.isLoadingToggle(false)

      this.setState({
        name: ''
      })
    }
  }

  isLoadingToggle = (isLoading) => {
    this.setState({
      isLoading
    })
  }

  setClientName = (event) => {
    this.setState({
      name: event.target.value
    })
  }

  render() {
    const { classes } = this.props
    const { name, visible, isLoading } = this.state

    return (
      <div className={classes.root}>
        {
          visible
            ? <form onSubmit={this.create}>
                <Grid container>
                  <Grid item xs={12}>
                    {/* Input - Client Name */}
                    <TextField
                      value={name}
                      onChange={this.setClientName}
                      placeholder={'Enter client name'}
                      margin={'none'}
                      required={true}
                      fullWidth
                      autoFocus
                    />
                  </Grid>

                  <Grid item xs={12} className={classes.buttonsContainer}>
                    {/* Button - Cancel */}
                    <IconButton
                      onClick={() => this.visibleToggle(false)}
                      aria-label={'Cancel'}
                    >
                      <IconClose />
                    </IconButton>

                    {/* Button -  Save */}
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
              </form>
            : <Button
                onClick={() => this.visibleToggle(true)}
                fullWidth
                className={classes.buttonAdd}
              >
                Add Client
              </Button>
        }
      </div>
    )
  }
}

// Component Properties
Quick.propTypes = {
  classes: PropTypes.object.isRequired,
  getClientsList: PropTypes.func.isRequired,
  createClient: PropTypes.func.isRequired,
  messageShow: PropTypes.func.isRequired
}

export default connect(null, { getClientsList, createClient, messageShow })(withStyles(styles)(Quick))
