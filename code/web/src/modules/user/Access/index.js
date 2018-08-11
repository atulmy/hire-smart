// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

// UI Imports
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'

// App Imports
import AuthCheckAccess from '../../auth/AuthCheckAccess'
import Login from './Login'
import Signup from './Signup'
import ForgotPassword from './ForgotPassword'

// Component
class Access extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      tab: 'login'
    }
  }

  tabSwitch = (event, tab) => {
    this.setState({ tab })
  }

  render() {
    const { classes } = this.props
    const { tab } = this.state

    return(
      <div className={classes.root}>
        <Paper className={classes.container}>
          <div className={classes.tabs}>
            <Tabs
              value={tab}
              onChange={this.tabSwitch}
              centered
            >
              <Tab label={'Login'} value={'login'} />
              <Tab label={'Signup'} value={'signup'} />
              <Tab label={'Forgot Password'} value={'forgotPassword'} />
            </Tabs>
          </div>

          <div className={classes.tabsContent}>
            {
              {
                login: <Login />,
                signup: <Signup />,
                forgotPassword: <ForgotPassword />
              }[tab]
            }
          </div>
        </Paper>

        <AuthCheckAccess />
      </div>
    )
  }
}

// Component Properties
Access.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Access)
