// Imports
import React, { PureComponent } from 'react'
import { Helmet } from 'react-helmet'

// UI Imports
import Toolbar from '@material-ui/core/Toolbar'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import IconHelp from '@material-ui/icons/Help'
import Fade from '@material-ui/core/Fade'
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'

// App Imports
import List from './List'
import CreateOrEdit from './CreateOrEdit'

// Component
class Manage extends PureComponent {
  render () {
    const { classes } = this.props

    return (
      <Fade in={true}>
        <div>
          {/* Meta tags */}
          <Helmet>
            <title>Manage Projects - HireSmart</title>
          </Helmet>

          {/* Toolbar - Heading */}
          <Toolbar className={classes.toolbar}>
            <Typography
              variant={'body2'}
              color={'inherit'}
              className={classes.title}
            >
              Manage Projects
            </Typography>

            <Tooltip title={'Help'} placement={'bottom'} enterDelay={500}>
              <IconButton
                aria-label={'Help'}
                className={classes.toolbarIcon}
              >
                <IconHelp />
              </IconButton>
            </Tooltip>
          </Toolbar>

          <div className={classes.content}>
            <Grid container spacing={6}>
              {/* Add or Edit */}
              <Grid item xs={12} md={3}>
                <CreateOrEdit />
              </Grid>

              {/* List */}
              <Grid item xs={12} md={9}>
                <List />
              </Grid>
            </Grid>
          </div>
        </div>
      </Fade>
    )
  }
}

export default withStyles(styles)(Manage)
