// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'

// UI Imports
import Toolbar from '@material-ui/core/Toolbar'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Fade from '@material-ui/core/Fade'
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'

// App Imports
import { getList } from '../api/actions/query'
import List from './List'
import CreateOrEdit from './CreateOrEdit'

// Component
class Manage extends PureComponent {
  render () {
    const { classes, getList } = this.props

    return (
      <Fade in={true}>
        <div>
          {/* Meta tags */}
          <Helmet>
            <title>Manage Candidates - HireSmart</title>
          </Helmet>

          {/* Toolbar - Heading */}
          <Toolbar className={classes.toolbar}>
            <Typography
              variant={'body2'}
              color={'inherit'}
              className={classes.title}
            >
              Manage Candidates
            </Typography>
          </Toolbar>

          <div className={classes.content}>
            <Grid container spacing={6}>
              {/* Add or Edit */}
              <Grid item xs={12} md={3}>
                <CreateOrEdit successCallback={getList} />
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

// Component Properties
Manage.propTypes = {
  getList: PropTypes.func.isRequired
}

export default connect(null, { getList })(withStyles(styles)(Manage))
