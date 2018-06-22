// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'

// UI Imports
import Fade from '@material-ui/core/Fade'
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'

// App Imports
import params from '../../../setup/config/params'
import Sidebar from './Sidebar'
import Content from './Content'

// Component
class Account extends PureComponent {
  render() {
    const { classes } = this.props

    return(
      <Fade in={true}>
        <div className={classes.root}>
          {/* Meta tags */}
          <Helmet>
            <title>Account - { params.site.name }</title>
          </Helmet>

          {/* Sidebar */}
          <Sidebar />

          {/* Content */}
          <Content />
        </div>
      </Fade>
    )
  }
}

// Component Properties
Account.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Account)
