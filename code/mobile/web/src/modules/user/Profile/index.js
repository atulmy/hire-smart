// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// UI Imports
import Toolbar from '@material-ui/core/Toolbar/Toolbar'
import Typography from '@material-ui/core/Typography/Typography'
import Button from '@material-ui/core/Button/Button'
import { withStyles } from '@material-ui/core/styles/index'
import styles from './styles'

// App Imports
import { messageShow } from '../../common/api/actions'
import { logout } from '../../user/api/actions/query'
import Section from '../../common/Section'
import Layout from '../../common/Layout'
import Header from '../../common/Header'

// Component
class Profile extends PureComponent {
  onClickLogout = () => {
    let check = window.confirm('Are you sure you want to logout?')

    if(check) {
      const { logout, messageShow } = this.props

      logout()

      messageShow('You have been logged out successfully.')
    }
  }

  render() {
    const { auth: { details }, classes } = this.props

    return (
      <Layout>
        <Header title={'Profile'} />

        <Section>
          <Typography paragraph>Sunt consiliumes convertam nobilis, neuter cobaltumes.</Typography>

          <Typography>Name: { details.name }</Typography>
          <Typography>Email: { details.email }</Typography>

          <Button onClick={this.onClickLogout} variant="outlined">Logout</Button>
        </Section>
      </Layout>
    )
  }
}

// Component Properties
Profile.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  messageShow: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
}

// Component State
function profileState(state) {
  return {
    auth: state.auth
  }
}

export default connect(profileState, { logout, messageShow })(withStyles(styles)(Profile))
