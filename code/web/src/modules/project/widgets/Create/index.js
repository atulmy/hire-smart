// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import isEmpty from 'lodash/isEmpty'

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
import { getList as getProjectsList } from '../../../project/api/actions/query'
import { create as createProject } from '../../../project/api/actions/mutation'

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

  create = async event => {
    event.preventDefault()

    const { createProject, getProjectsList, messageShow } = this.props
    const { name } = this.state

    // Validate
    if(!isEmpty(name)) {
      messageShow('Adding project, please wait..')

      this.isLoadingToggle(true)

      // Create
      try {
        const { data } = await createProject({ name })

        if(data.errors && data.errors.length > 0) {
          messageShow(data.errors[0].message)
        } else {
          // Refresh project list
          getProjectsList(false)

          // Hide create project form
          this.visibleToggle(false)()

          messageShow('Project added successfully.')
        }
      } catch(error) {
        messageShow('There was some error. Please try again.')
      } finally {
        this.isLoadingToggle(false)
      }
    } else {
      messageShow('Please enter project name.')
    }
  }

  visibleToggle = visible => () => {
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

  setProjectName = (event) => {
    this.setState({
      name: event.target.value
    })
  }

  render() {
    const { classes, projects } = this.props
    const { name, visible, isLoading } = this.state

    return (
      <div className={classes.root}>
        {
          visible
            ? <form onSubmit={this.create}>
                <Grid container>
                  <Grid item xs={12}>
                    {/* Input - Project Name */}
                    <TextField
                      value={name}
                      onChange={this.setProjectName}
                      placeholder={'Enter project name'}
                      margin={'none'}
                      required={true}
                      fullWidth
                      autoFocus
                    />
                  </Grid>

                  <Grid item xs={12} className={classes.buttonsContainer}>
                    {/* Button - Cancel */}
                    <IconButton
                      onClick={this.visibleToggle(false)}
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
                onClick={this.visibleToggle(true)}
                fullWidth
                className={projects.list && projects.list.length > 0 ? classes.buttonAdd : classes.buttonAddPrimary}
              >
                Add Project
              </Button>
        }
      </div>
    )
  }
}

// Component Properties
Quick.propTypes = {
  classes: PropTypes.object.isRequired,
  projects: PropTypes.object.isRequired,
  getProjectsList: PropTypes.func.isRequired,
  createProject: PropTypes.func.isRequired,
  messageShow: PropTypes.func.isRequired
}


// Component State
function quickState(state) {
  return {
    projects: state.projects,
  }
}

export default connect(quickState, { getProjectsList, createProject, messageShow })(withStyles(styles)(Quick))
