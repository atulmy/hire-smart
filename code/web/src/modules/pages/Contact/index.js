// Imports
import React from 'react'
import { Helmet } from 'react-helmet'

// UI Imports
import Toolbar from '@material-ui/core/Toolbar'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Fade from '@material-ui/core/Fade'
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'

// App Imports
import { WEB_URL, CONTACT_EMAIL, CONTACT_PHONE, CONTACT_ADDRESS } from '../../../setup/config/env'

// Component
const Contact = (props) => {
  const { classes } = props
  
  return(
    <Fade in={true}>
      <div>
        {/* Meta tags */}
        <Helmet>
          <title>Contact - HireSmart</title>
        </Helmet>

        {/* Toolbar - Heading */}
        <Toolbar className={classes.toolbar}>
          <Typography
            variant={'body2'}
            color={'inherit'}
            className={classes.title}
          >
            Contact
          </Typography>
        </Toolbar>

        <div className={classes.content}>
          <Grid container style={{ marginTop: 50 }}>
            <Grid item xs={12}>
              <Typography
                color={'inherit'}
                className={classes.caption}
              >
                We are available 24x7, 365 days a year. Please feel free to get in touch via any of following way:
              </Typography>
            </Grid>
          </Grid>

          <Grid container spacing={6} style={{ marginTop: 20 }}>
            <Grid item xs={6} style={{ textAlign: 'right' }}>
              <img src={`${ WEB_URL }/images/illustrations/contact.svg`} style={{ width: 300 }} alt='contact' />
            </Grid>

            <Grid item xs={6}>
              <div>
                <div className={classes.item}>
                  <Typography variant={'caption'} gutterBottom>
                    Email
                  </Typography>

                  <Typography gutterBottom>
                    { CONTACT_EMAIL }
                  </Typography>
                </div>
              </div>

              <div>
                <div className={classes.item}>
                  <Typography variant={'caption'} gutterBottom>
                    Mobile
                  </Typography>

                  <Typography gutterBottom>
                    { CONTACT_PHONE }
                  </Typography>
                </div>
              </div>

              <div>
                <div className={classes.item}>
                  <Typography variant={'caption'} gutterBottom>
                    Address
                  </Typography>

                  <Typography gutterBottom>
                    { CONTACT_ADDRESS }
                  </Typography>
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </Fade>
  )
}

export default withStyles(styles)(Contact)
