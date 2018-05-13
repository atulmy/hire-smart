// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

// UI Imports
import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'
import { withStyles } from 'material-ui/styles'
import styles from './styles'

// App Imports

// Component
class Footer extends PureComponent {
  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <Grid container>
          <Grid item sm={6} className={classes.left}>
            <Typography variant="button">
              &copy; 2018 HireSmart
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
