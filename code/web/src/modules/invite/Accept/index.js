// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// UI Imports
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'

// App Imports
import routes from '../../../setup/routes'
import { get } from '../api/actions/query'
import { messageShow } from '../../common/api/actions'
import AuthCheckAccess from '../../auth/AuthCheckAccess'
import Loading from '../../common/Loading'

// Component
class Invite extends PureComponent {

  constructor(props) {
    super(props)

    this.state = {
      isLoading: true,
      invite: null
    }
  }

  isLoadingToggle = (isLoading) => {
    this.setState({
      isLoading
    })
  }

  componentDidMount() {
    this.refresh()
  }

  refresh = async () => {
    const { get, messageShow, match, history } = this.props

    const code = match.params.code

    try {
      const { data } = await get(code)

      if (data.errors && data.errors.length > 0) {
        messageShow(data.errors[0].message)
      } else {
        if(data.data.invite && data.data.invite._id) {
          this.setState({
            invite: data.data.invite
          })
        } else {
          messageShow('Invalid invite link.')

          history.push(routes.home.path)
        }
      }
    } catch(error) {
      messageShow('There was some error. Please try again.')
    } finally {
      this.isLoadingToggle(false)
    }
  }

  render() {
    const { classes } = this.props
    const { isLoading, invite } = this.state

    console.log(invite)

    return (
      <div className={classes.root}>
        {
          isLoading
            ? <Loading />
            : <Paper className={classes.container}>
                <Typography variant={'title'} gutterBottom>
                  Invitation to join { invite.organizationId.name }
                </Typography>

                <p>Invited</p>
              </Paper>
        }

        <AuthCheckAccess />
      </div>
    )
  }
}

// Component Properties
Invite.propTypes = {
  classes: PropTypes.object.isRequired,
  get: PropTypes.func.isRequired,
  messageShow: PropTypes.func.isRequired
}

// Component State
function dummyComponentReduxState(state) {
  return {
    common: state.common
  }
}

export default connect(dummyComponentReduxState, { get, messageShow })(withStyles(styles)(Invite))
