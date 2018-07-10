// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

// UI Imports
import Divider from '@material-ui/core/Divider'
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'

// App Imports
import ProjectList from '../../project/widgets/List'
import ProjectCreate from '../../project/widgets/Create'

// Component
class Sidebar extends PureComponent {
  render() {
    const { classes } = this.props

    return (
      <div className={classes.sidebar}>
        {/* Project List */}
        <ProjectList />

        {/* Divider */}
        <Divider />

        {/* Create Project */}
        <ProjectCreate />
      </div>
    )
  }
}

// Component Properties
Sidebar.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Sidebar)
