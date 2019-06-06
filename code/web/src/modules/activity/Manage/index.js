// Imports
import React, { PureComponent } from 'react'
import { Helmet } from 'react-helmet'

// UI Imports
import Toolbar from '@material-ui/core/Toolbar'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Fade from '@material-ui/core/Fade'
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'

// App Imports
import List from './List'

// Component
class Manage extends PureComponent {
  render () {
    const { classes } = this.props

    return (
      <Fade in={true}>
        <div>
          {/* Meta tags */}
          <Helmet>
            <title>Activities - HireSmart</title>
          </Helmet>

          {/* Toolbar - Heading */}
          <Toolbar className={classes.toolbar}>
            <Typography
              variant={'body2'}
              color={'inherit'}
              className={classes.title}
            >
              Activities
            </Typography>
          </Toolbar>

          <div className={classes.content}>
            <Grid container spacing={6}>
              {/* List */}
              <Grid item xs={12}>
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
