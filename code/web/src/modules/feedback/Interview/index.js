// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import isEmpty from 'lodash/isEmpty'

// UI Imports
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Fade from '@material-ui/core/Fade'
import Zoom from '@material-ui/core/Zoom'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import IconButton from '@material-ui/core/IconButton'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import IconCheck from '@material-ui/icons/Check'
import green from '@material-ui/core/colors/green'
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'

// App Imports
import routes from '../../../setup/routes'
import params from '../../../setup/config/params'
import { nullToEmptyString } from '../../../setup/helpers'
import { get } from '../../interview/api/actions/query'
import { submit } from '../../feedback/api/actions/mutation'
import { messageShow } from '../../common/api/actions'
import AuthCheckAccess from '../../auth/AuthCheckAccess'
import Loading from '../../common/Loading'

// Component
class Interview extends PureComponent {

  constructor(props) {
    super(props)

    this.state = {
      isLoadingSubmit: false,
      submitted: false,

      text: '',
      status: ''
    }
  }

  componentDidMount() {
    this.refresh()
  }

  isLoadingSubmitToggle = (isLoadingSubmit) => {
    this.setState({
      isLoadingSubmit
    })
  }

  refresh = () => {
    const { get, messageShow, match, history } = this.props

    const interviewId = match.params.interviewId

    if(!isEmpty(interviewId)) {
      get(interviewId)
    } else{
      messageShow('Invalid invite link.')

      history.push(routes.home.path)
    }
  }

  onType = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  submit = async event => {
    event.preventDefault()

    const { submit, messageShow, interview: { item } } = this.props
    const { text, status } = this.state

    // Validate
    if(!isEmpty(item._id) && !isEmpty(text) && !isEmpty(status)) {
      this.isLoadingSubmitToggle(true)

      try {
        const { data } = await submit({ interviewId: item._id, text, status })

        if(data.errors && data.errors.length > 0) {
          messageShow(data.errors[0].message)
        } else {
          this.setState({
            submitted: true
          })
        }
      } catch(error) {
        messageShow('There was some error. Please try again.')
      } finally {
        this.isLoadingSubmitToggle(false)
      }
    } else {
      messageShow('Please enter all the required information.')
    }
  }

  handleChange = event => {
    this.setState({ status: event.target.value });
  };

  render() {
    const { classes, interview: { isLoading, item } } = this.props
    const { isLoadingSubmit, text, status, submitted } = this.state

    return (
      <Fade in={true}>
        <div className={classes.root}>
          {
            isLoading || !item._id
              ? <Loading />
              : <Zoom in={true}>
                  <Paper className={classes.container}>
                    <Typography variant={'h6'} gutterBottom style={{ textAlign: 'center' }}>
                      Interview Feedback
                    </Typography>

                    <Typography variant={'caption'} gutterBottom style={{ textAlign: 'center' }}>
                      Please provide your feedback for { item.candidateId.name }:
                    </Typography>

                    {
                      !submitted
                        ? <form onSubmit={this.submit}>
                            <Grid container style={{marginTop: 8}}>
                              {/* Input - name */}
                              <Grid item xs={12}>
                                <TextField
                                  name={'text'}
                                  value={nullToEmptyString(text)}
                                  onChange={this.onType}
                                  label={'Your feedback'}
                                  placeholder={'Enter your feedback'}
                                  required={true}
                                  margin={'normal'}
                                  autoComplete={'off'}
                                  fullWidth
                                  rowsMax={8}
                                  rows={3}
                                  multiline
                                  autoFocus
                                />
                              </Grid>

                              {/* Input - Status */}
                              <Grid item xs={12}>
                                <FormControl
                                  component={'fieldset'}
                                  required
                                  className={classes.radioContainer}
                                >
                                  <FormLabel component={'legend'}>Status</FormLabel>
                                  <RadioGroup
                                    aria-label={'status'}
                                    name={'status'}
                                    value={status}
                                    onChange={this.handleChange}
                                    style={{flexDirection: 'row'}}
                                  >
                                    {
                                      params.kanban.columns.filter(column => column.feedback).map(column => (
                                        <FormControlLabel
                                          key={column.key} value={column.key}
                                          control={<Radio classes={{root: classes.radio}} color={'primary'}/>}
                                          label={column.name}
                                          className={classes.radioLabel}
                                        />
                                      ))
                                    }
                                  </RadioGroup>
                                </FormControl>
                              </Grid>

                              {/* Button -  Save */}
                              <Grid item xs={12} className={classes.buttonsContainer}>
                                <IconButton
                                  type={'submit'}
                                  aria-label={'Save'}
                                  color={'primary'}
                                  disabled={isLoadingSubmit}
                                >
                                  <IconCheck/>
                                </IconButton>
                              </Grid>
                            </Grid>
                          </form>
                        : <Grid container>
                            <Grid item xs={12}>
                              <ListItem>
                                <Avatar style={{backgroundColor: green[500]}}>
                                  <IconCheck/>
                                </Avatar>
                                <ListItemText primary={'Success!'} secondary={'Your feedback was submitted successfully.'}/>
                              </ListItem>
                            </Grid>
                          </Grid>
                    }
                  </Paper>
                </Zoom>
          }

          <AuthCheckAccess />
        </div>
      </Fade>
    )
  }
}

// Component Properties
Interview.propTypes = {
  classes: PropTypes.object.isRequired,
  interview: PropTypes.object.isRequired,
  get: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  messageShow: PropTypes.func.isRequired
}

// Component State
function interviewState(state) {
  return {
    interview: state.interview
  }
}

export default connect(interviewState, { get, submit, messageShow })(withStyles(styles)(Interview))
