// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

// UI Imports
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'

// App Imports
import params from '../../../setup/config/params'
import routes from '../../../setup/routes'

// Component
class Footer extends PureComponent {
  render() {
    const { classes } = this.props

    return (
      <footer className={classes.root}>
        <Grid container>
          <Grid item sm={6} className={classes.left}>
            <Typography variant={'button'} className={classes.copyright}>
              &copy; { params.site.copyright_year } <Link to={routes.home.path}>{ params.site.name } <span style={{ fontSize: '70%' }}>v{ params.site.version }</span></Link>
            </Typography>
          </Grid>

          <Grid item sm={6} className={classes.right}>
            <Link to={routes.contact.path}>
              <Typography variant={'button'} className={classes.link}>
                Contact
              </Typography>
            </Link>

            <Link to={routes.privacy.path}>
              <Typography variant={'button'} className={classes.link}>
                Privacy
              </Typography>
            </Link>
          </Grid>
        </Grid>
      </footer>
    )
  }
}

// Component Properties
Footer.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Footer)
