// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// UI Imports
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import IconCheck from '@material-ui/icons/Check'
import Fade from '@material-ui/core/Fade'
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'

// App Imports
import { nullToEmptyString } from '../../../../setup/helpers'
import { getListByOrganization } from '../../../user/api/actions/query'
import { inviteToOrganization } from '../../../user/api/actions/mutation'
import { messageShow } from '../../../common/api/actions'
import Loading from '../../../common/Loading'
import isEmpty from 'validator/lib/isEmpty'
import EmptyMessage from '../../../common/EmptyMessage'

// Component
class People extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: false,
      users: [],

      isLoadingSubmit: false,
      name: '',
      email: '',
    }
  }

  componentDidMount() {
    this.refresh()
  }

  refresh = (isLoading = true) => {
    const { getListByOrganization, messageShow } = this.props

    this.isLoadingToggle(isLoading)

    getListByOrganization()
      .then(response => {
        if (response.data.errors && response.data.errors.length > 0) {
          messageShow(response.data.errors[0].message)
        } else {
          this.setState({
            users: response.data.data.usersByOrganization
          })
        }
      })
      .catch(() => {
        messageShow('There was some error. Please try again.')
      })
      .finally(() => {
        this.isLoadingToggle(false)
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

  invite = event => {
    event.preventDefault()

    const { inviteToOrganization, messageShow } = this.props
    const { name, email } = this.state

    // Validate
    if(!isEmpty(name) && !isEmpty(email)) {
      messageShow('Inviting user, please wait..')

      this.isLoadingSubmitToggle(true)

      // Update
      inviteToOrganization({ name, email })
        .then(response => {
          if(response.data.errors && !isEmpty(response.data.errors)) {
            messageShow(response.data.errors[0].message)
          } else {
            // Reset form data
            this.setState({
              name: '',
              email: ''
            })

            messageShow(`${ name } has been invited successfully.`)

            // Refresh people list, silently
            this.refresh(false)
          }
        })
        .catch(() => {
          messageShow('There was some error. Please try again.')
        })
        .finally(() => {
          this.isLoadingSubmitToggle(false)
        })
    } else {
      messageShow('Please enter name and email.')
    }
  }

  onType = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    const { classes } = this.props
    const { isLoading, users, isLoadingSubmit, name, email } = this.state

    return (
      <div>
        <Grid container spacing={24}>
          {/* Add */}
          <Grid item xs={12} md={3}>
            <Paper elevation={1} className={classes.formContainer}>
              <Typography
                variant={'subheading'}
                color={'inherit'}
              >
                Invite team mate to join the organization
              </Typography>

              <form onSubmit={this.invite}>
                {/* Input - name */}
                <Grid item xs={12}>
                  <TextField
                    name={'name'}
                    value={nullToEmptyString(name)}
                    onChange={this.onType}
                    label={'Full Name'}
                    placeholder={'Enter full name'}
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
                    value={nullToEmptyString(email)}
                    onChange={this.onType}
                    label={'Email'}
                    placeholder={'Enter email'}
                    type={'email'}
                    required={true}
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
              </form>
            </Paper>
          </Grid>

          {/* List */}
          <Grid item xs={12} md={9}>
            <div className={classes.list}>
              {
                isLoading
                  ? <Loading />
                  : <Fade in={true}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell width={120} className={classes.textCenter}>Joined</TableCell>
                            <TableCell width={120} className={classes.textCenter}>Actions</TableCell>
                          </TableRow>
                        </TableHead>

                        <TableBody>
                          {
                            users.length > 0
                              ? users.map(user => (
                                  <TableRow key={user._id}>
                                    <TableCell>{ user.name }</TableCell>
                                    <TableCell>{ user.email }</TableCell>
                                    <TableCell className={classes.textCenter}>-</TableCell>
                                    <TableCell className={classes.textCenter}>-</TableCell>
                                  </TableRow>
                                ))
                              : <TableRow>
                                  <TableCell colSpan={4}>
                                    <EmptyMessage message={'You have not invited anyone yet.'}/>
                                  </TableCell>
                                </TableRow>
                          }
                        </TableBody>
                      </Table>
                    </Fade>
              }
            </div>
          </Grid>
        </Grid>
      </div>
    )
  }
}

// Component Properties
People.propTypes = {
  classes: PropTypes.object.isRequired,
  getListByOrganization: PropTypes.func.isRequired,
  inviteToOrganization: PropTypes.func.isRequired,
  messageShow: PropTypes.func.isRequired
}

export default connect(null, { getListByOrganization, inviteToOrganization, messageShow })(withStyles(styles)(People))
