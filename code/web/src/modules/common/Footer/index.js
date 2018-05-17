// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

// UI Imports
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'

// App Imports
import params from '../../../setup/config/params'

// Component
class Footer extends PureComponent {
  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <Grid container>
          <Grid item sm={6} className={classes.left}>
            <Typography variant="button">
              &copy; { params.meta.copyright_year } { params.meta.site_name }
            </Typography>
          </Grid>

          <Grid item sm={6} className={classes.right}>
            <Typography variant="button" className={classes.link}>
              About
            </Typography>

            <Typography variant="button" className={classes.link}>
              Privacy
            </Typography>

            <Typography variant="button" className={classes.link}>
              Help
            </Typography>
          </Grid>
        </Grid>
      </div>
    )
  }
}

// Component Properties
Footer.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Footer)
