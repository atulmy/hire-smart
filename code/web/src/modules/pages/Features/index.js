// Imports
import React from 'react'
import { Helmet } from 'react-helmet'

// UI Imports
import Toolbar from '@material-ui/core/Toolbar'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Fade from '@material-ui/core/Fade'
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'
import { WEB_URL } from '../../../setup/config/env'

// App Imports

// Component
const Features = (props) => {
  const { classes } = props
  
  return(
    <Fade in={true}>
      <div>
        {/* Meta tags */}
        <Helmet>
          <title>Features - HireSmart</title>
        </Helmet>

        {/* Toolbar - Heading */}
        <Toolbar className={classes.toolbar}>
          <Typography
            variant={'body2'}
            color={'inherit'}
            className={classes.title}
          >
            Features
          </Typography>
        </Toolbar>

        <div className={classes.content}>
          {/* Birds eye view */}
          <Grid container>
            <Grid item xs={12} md={6} className={classes.featureItemTextContainer}>
              <Typography
                variant={'h4'}
                gutterBottom
                className={classes.featureItemTitle}
              >
                Birds Eye View
              </Typography>

              <Typography
                variant={'subtitle1'}
                className={classes.featureItemSubTitle}
              >
                Summary of the project, candidates and activities at one place.
              </Typography>
            </Grid>

            <Grid item xs={12} md={6} className={classes.featureItemImageContainer}>
              <img src={`${ WEB_URL }/images/illustrations/dashboard.svg`} className={classes.featureItemImage} alt='Birds Eye View' />
            </Grid>
          </Grid>

          <Divider light className={classes.divider} />

          {/* Teamwork */}
          <Grid container>
            <Grid item xs={12} md={6} className={classes.featureItemImageContainer}>
              <img src={`${ WEB_URL }/images/illustrations/connected.svg`} className={classes.featureItemImage} alt='Teamwork for the Win!' />
            </Grid>

            <Grid item xs={12} md={6} className={classes.featureItemTextContainer}>
              <Typography
                variant={'h4'}
                gutterBottom
                className={classes.featureItemTitle}
              >
                Teamwork for the Win!
              </Typography>

              <Typography
                variant={'subtitle1'}
                className={classes.featureItemSubTitle}
              >
                Create your organization and invite your team mates. Keep everyone updated on the progress.
              </Typography>
            </Grid>
          </Grid>

          <Divider light className={classes.divider} />

          {/* Candidate's Progress */}
          <Grid container>
            <Grid item xs={12} md={6} className={classes.featureItemTextContainer}>
              <Typography
                variant={'h4'}
                gutterBottom
                className={classes.featureItemTitle}
              >
                Candidate's Progress
              </Typography>

              <Typography
                variant={'subtitle1'}
                className={classes.featureItemSubTitle}
              >
                Track the progress and journey of candidates.
              </Typography>
            </Grid>

            <Grid item xs={12} md={6} className={classes.featureItemImageContainer}>
              <img src={`${ WEB_URL }/images/illustrations/progress.svg`} className={classes.featureItemImage} alt="Candidate's Progress" />
            </Grid>
          </Grid>

          <Divider light className={classes.divider} />

          {/* Master Data Management */}
          <Grid container>
            <Grid item xs={12} md={6} className={classes.featureItemImageContainer}>
              <img src={`${ WEB_URL }/images/illustrations/files.svg`} className={classes.featureItemImage} alt='Master Data Management' />
            </Grid>

            <Grid item xs={12} md={6} className={classes.featureItemTextContainer}>
              <Typography
                variant={'h4'}
                gutterBottom
                className={classes.featureItemTitle}
              >
                Master Data Management
              </Typography>

              <Typography
                variant={'subtitle1'}
                className={classes.featureItemSubTitle}
              >
                Manage all your project, candidate, interviewers and other data in one place.
              </Typography>
            </Grid>
          </Grid>

          <Divider light className={classes.divider} />

          {/* Collaborate */}
          <Grid container>
            <Grid item xs={12} md={6} className={classes.featureItemTextContainer}>
              <Typography
                variant={'h4'}
                gutterBottom
                className={classes.featureItemTitle}
              >
                Collaborate
              </Typography>

              <Typography
                variant={'subtitle1'}
                className={classes.featureItemSubTitle}
              >
                Hiring is sometimes not a one person job. We make it easy to collaborate with ease.
              </Typography>
            </Grid>

            <Grid item xs={12} md={6} className={classes.featureItemImageContainer}>
              <img src={`${ WEB_URL }/images/illustrations/collaboration.svg`} className={classes.featureItemImage} alt='Collaborate' />
            </Grid>
          </Grid>

          <Divider light className={classes.divider} />

          {/* Secure */}
          <Grid container>
            <Grid item xs={12} md={6} className={classes.featureItemImageContainer}>
              <img src={`${ WEB_URL }/images/illustrations/security.svg`} className={classes.featureItemImage} alt='Secure' />
            </Grid>

            <Grid item xs={12} md={6} className={classes.featureItemTextContainer}>
              <Typography
                variant={'h4'}
                gutterBottom
                className={classes.featureItemTitle}
              >
                Secure
              </Typography>

              <Typography
                variant={'subtitle1'}
                className={classes.featureItemSubTitle}
              >
                We use industry standard encryption and high quality storage service. Your data is safe and protected.
              </Typography>
            </Grid>
          </Grid>

          <Divider light className={classes.divider} />

          {/* Notified */}
          <Grid container>
            <Grid item xs={12} md={6} className={classes.featureItemTextContainer}>
              <Typography
                variant={'h4'}
                gutterBottom
                className={classes.featureItemTitle}
              >
                Notification
              </Typography>

              <Typography
                variant={'subtitle1'}
                className={classes.featureItemSubTitle}
              >
                Keep your team mates, candidates and interviewer notified.
              </Typography>
            </Grid>

            <Grid item xs={12} md={6} className={classes.featureItemImageContainer}>
              <img src={`${ WEB_URL }/images/illustrations/email.svg`} className={classes.featureItemImage} alt='Notification' />
            </Grid>
          </Grid>

          <Divider light className={classes.divider} />

          {/* Secure */}
          <Grid container>
            <Grid item xs={12} md={6} className={classes.featureItemImageContainer}>
              <img src={`${ WEB_URL }/images/illustrations/checklist.svg`} className={classes.featureItemImage} alt='Receive Feedback' />
            </Grid>

            <Grid item xs={12} md={6} className={classes.featureItemTextContainer}>
              <Typography
                variant={'h4'}
                gutterBottom
                className={classes.featureItemTitle}
              >
                Receive Feedback
              </Typography>

              <Typography
                variant={'subtitle1'}
                className={classes.featureItemSubTitle}
              >
                Get feedback from the interviewer and make informed decision on hiring.
              </Typography>
            </Grid>
          </Grid>
        </div>
      </div>
    </Fade>
  )
}

export default withStyles(styles)(Features)
