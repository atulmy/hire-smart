// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Route, Switch, withRouter } from 'react-router-dom'

// UI Imports
import { withStyles } from '@material-ui/core/styles'
import Fade from '@material-ui/core/Fade'
import styles from './styles'

// App Imports
import routes from '../../../../setup/routes'
import Demo from './Demo'
import Profile from './Profile'

// Component
class Content extends PureComponent {
  constructor() {
    super()

    this.state = {}
  }

  render() {
    const { classes, location } = this.props

    return (
      <Fade in={true}>
        <div className={classes.root}>
          <Switch location={location}>
            <Route exact path={routes.account.path} component={Profile} />
            <Route exact path={routes.account.child.demo.path} component={Demo} />
          </Switch>
        </div>
      </Fade>
    )
  }
}

// Component Properties
Content.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(withRouter(Content))
