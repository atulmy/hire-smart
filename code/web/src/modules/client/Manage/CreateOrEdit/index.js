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
import { getList } from '../../api/actions/query'
import { createOrUpdate } from '../../api/actions/mutation'
import { messageShow } from '../../../common/api/actions'

// Component
class CreateOrEdit extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: false,

      id: '',
      name: '',
      description: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    const { client } = nextProps.clientEdit

    if(client._id !== this.state.id) {
      this.setState({
        id: client._id,
        name: client.name,
        description: client.description
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
      description: ''
    })
  }

  save = async (event) => {
    event.preventDefault()

    const { createOrUpdate, getList, messageShow } = this.props

    const { id, name, description } = this.state

    // Validate
    if(!isEmpty(name)) {
      messageShow('Adding client, please wait..')

      this.isLoadingToggle(true)

      // Create or Update
      try {
        const { data } = await createOrUpdate({ id, name, description })

        if(data.errors && !isEmpty(data.errors)) {
          messageShow(data.errors[0].message)
        } else {
          // Update clients list
          getList(false)

          // Reset form data
          this.reset()

          if(!isEmpty(id)) {
            messageShow('Client updated successfully.')
          } else {
            messageShow('Client added successfully.')
          }
        }
      } catch(error) {
        messageShow('There was some error. Please try again.')
      } finally {
        this.isLoadingToggle(false)
      }
    } else {
      messageShow('Please enter client name.')
    }
  }

  render() {
    const { classes } = this.props
    const { isLoading, id, name, description } = this.state

    return (
      <Paper elevation={1} className={classes.formContainer}>
        <Typography
          variant={'subheading'}
          color={'inherit'}
        >
          { id === '' ? `Add new client` : `Edit client` }
        </Typography>

        <form onSubmit={this.save}>
          {/* Input - name */}
          <Grid item xs={12}>
            <TextField
              name={'name'}
              value={nullToEmptyString(name)}
              onChange={this.onType}
              label={'Client Name'}
              placeholder={'Enter name'}
              required={true}
              margin={'normal'}
              autoComplete={'off'}
              fullWidth
            />
          </Grid>

          {/* Input - description */}
          <Grid item xs={12}>
            <TextField
              name={'description'}
              value={nullToEmptyString(description)}
              onChange={this.onType}
              label={'Client description'}
              placeholder={'Enter description'}
              margin={'normal'}
              autoComplete={'off'}
              rowsMax={3}
              rows={1}
              multiline
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
  classes: PropTypes.object.isRequired,
  clientEdit: PropTypes.object.isRequired,
  createOrUpdate: PropTypes.func.isRequired,
  getList: PropTypes.func.isRequired,
  messageShow: PropTypes.func.isRequired
}

// Component State
function createOrEditState(state) {
  return {
    clientEdit: state.clientEdit
  }
}

export default connect(createOrEditState, { createOrUpdate, getList, messageShow })(withStyles(styles)(CreateOrEdit))
