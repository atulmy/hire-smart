// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// UI Imports
import Divider from '@material-ui/core/Divider'
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'

// App Imports
import { get as getClient } from '../../client/api/actions'
import ClientList from '../../client/widgets/List'
import ClientCreate from '../../client/widgets/Create'

// Component
class Sidebar extends PureComponent {
  render() {
    const { classes } = this.props

    return (
      <div className={classes.sidebar}>
        {/* Client List */}
        <ClientList />

        {/* Divider */}
        <Divider />

        {/* Create Client */}
        <ClientCreate />
      </div>
    )
  }
}

// Component Properties
Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
  getClient: PropTypes.func.isRequired
}

export default connect(null, { getClient })(withStyles(styles)(Sidebar))
