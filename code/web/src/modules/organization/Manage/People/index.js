// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import isEmpty from 'lodash/isEmpty'

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
import { getList as getListInvites } from '../../../invite/api/actions/query'
import { inviteToOrganization } from '../../../invite/api/actions/mutation'
import { messageShow } from '../../../common/api/actions'
import Loading from '../../../common/Loading'
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

  refresh = async (isLoading = true) => {
    const { getListInvites, getListByOrganization, messageShow } = this.props

    getListInvites(isLoading)

    this.isLoadingToggle(isLoading)

    // Get users list by organization
    try {
      const { data } = await getListByOrganization()

      if (data.errors && data.errors.length > 0) {
        messageShow(data.errors[0].message)
      } else {
        this.setState({
          users: data.data
        })
      }
    } catch(error) {
      messageShow('There was some error. Please try again.')
    } finally {
      this.isLoadingToggle(false)
    }
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

  invite = async event => {
    event.preventDefault()

    const { user, inviteToOrganization, messageShow } = this.props

    if(user.isAuthenticated && user.details.demo) {
      messageShow('Sorry, to perform this action you need to verify your account.')
    } else {
      const { name, email } = this.state

      // Validate
      if (!isEmpty(name) && !isEmpty(email)) {
        messageShow('Inviting user, please wait..')

        this.isLoadingSubmitToggle(true)

        try {
          const { data } = await inviteToOrganization({ name, email })

          if (data.errors && data.errors.length > 0) {
            messageShow(data.errors[0].message)
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
        } catch (error) {
          messageShow('There was some error. Please try again.')
        } finally {
          this.isLoadingSubmitToggle(false)
        }
      } else {
        messageShow('Please enter name and email.')
      }
    }
  }

  onType = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    const { classes, user, invites } = this.props
    const { isLoading, users, isLoadingSubmit, name, email } = this.state

    return (
      <div>
        <Grid container spacing={6}>
          {/* Add */}
          <Grid item xs={12} md={3}>
            <Paper elevation={1} className={classes.formContainer}>
              <Typography
                variant={'subtitle1'}
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
                isLoading || invites.isLoading
                  ? <Loading />
                  : <Fade in={true}>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            {/*
                            <TableCell width={120} className={classes.textCenter}>Actions</TableCell>
                            */}
                          </TableRow>
                        </TableHead>

                        <TableBody>
                          {
                            user.isAuthenticated && user.details.demo
                              ? <TableRow>
                                  <TableCell colSpan={4}>
                                    <EmptyMessage message={'Please verify your account to see this list.'}/>
                                  </TableCell>
                                </TableRow>
                              : users.map(user => (
                                  <TableRow key={user._id}>
                                    <TableCell>{ user.name } { user.admin && '(admin)' }</TableCell>
                                    <TableCell>{ user.email }</TableCell>
                                    {/*
                                      <TableCell className={classes.textCenter}>-</TableCell>
                                    */}
                                  </TableRow>
                                ))
                          }

                          {
                            invites.list && invites.list.length > 0 &&
                              invites.list.map(invitee => (
                                <TableRow key={invitee._id}>
                                  <TableCell>{ invitee.name } (invited)</TableCell>
                                  <TableCell>{ invitee.email }</TableCell>
                                </TableRow>
                              ))
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
  user: PropTypes.object.isRequired,
  invites: PropTypes.object.isRequired,
  getListByOrganization: PropTypes.func.isRequired,
  inviteToOrganization: PropTypes.func.isRequired,
  getListInvites: PropTypes.func.isRequired,
  messageShow: PropTypes.func.isRequired
}

// Component State
function peopleState(state) {
  return {
    user: state.user,
    invites: state.invites
  }
}

export default connect(peopleState, { getListByOrganization, inviteToOrganization, getListInvites, messageShow })(withStyles(styles)(People))
