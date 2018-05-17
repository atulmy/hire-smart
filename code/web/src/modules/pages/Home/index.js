// Imports
import React from 'react'

// UI Imports
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button'
import Divider from 'material-ui/Divider'
import { withStyles } from 'material-ui/styles'
import styles from './styles'

// App Imports
import { APP_URL } from '../../../setup/config/env'

// Component
const Home = (props) => {
  const { classes } = props
  
  return(
    <div>
      {/* Hero */}
      <div className={classes.hero}>
        <Typography
          variant="display4"
          title={'Hire Smart'}
          className={classes.title}
        >
          Hire<span className={classes.titleHighlight}>Smart</span>
        </Typography>

        <Typography
          variant="headline"
          gutterBottom
          className={classes.subTitle}
        >
          Streamline your hiring process, scheduling interviews and tracking candidates.
          {/* Schedule and manage interviews efficiently. */}
        </Typography>

        <Button
          variant="raised"
          className={classes.button}
        >
          Start Now
        </Button>

        <Typography
          variant="caption"
          gutterBottom
          className={classes.buttonCaption}
        >
          login not required
        </Typography>
      </div>

      {/* Features */}
      <div className={classes.features}>
        <div className={classes.featureItem}>
          <div className={classes.featureItemLeft}>
            <Typography
              variant="display1"
              title={'Hire Smart'}
              gutterBottom
              className={classes.featureItemTitle}
            >
              Journey of candidate
            </Typography>

            <Typography
              variant="subheading"
              className={classes.featureItemSubTitle}
            >
              A candidate is a potential future employee. The journey matters as soon as you consider the profile and we enable you to have a holistic view at every step.
            </Typography>
          </div>

          <div className={classes.featureItemRight}>
            <img src={`${ APP_URL }/images/features/features-journey.png`} className={classes.featureItemImage} />
          </div>
        </div>

        <Divider light className={classes.divider} />

        <div className={classes.featureItem}>
          <div className={classes.featureItemLeft}>
            <img src={`${ APP_URL }/images/features/features-current-status.png`} className={classes.featureItemImage} />
          </div>

          <div className={classes.featureItemRight}>
            <Typography
              variant="display1"
              title={'Hire Smart'}
              gutterBottom
              className={classes.featureItemTitle}
            >
              Current status of the candidate
            </Typography>

            <Typography
              variant="subheading"
              className={classes.featureItemSubTitle}
            >
              We enable you to easily track the current status of the candidate so you have better control and make proper decisions.
            </Typography>
          </div>
        </div>

        <Divider light className={classes.divider} />

        <div className={classes.featureItem}>
          <div className={classes.featureItemLeft}>
            <Typography
              variant="display1"
              title={'Hire Smart'}
              gutterBottom
              className={classes.featureItemTitle}
            >
              Get feedback from panel
            </Typography>

            <Typography
              variant="subheading"
              className={classes.featureItemSubTitle}
            >
              Interviewer can provide a subjective and objective feedback for the candidate with a great ease in turn helping you to make the right decision for hiring.
            </Typography>
          </div>

          <div className={classes.featureItemRight}>
            <img src={`${ APP_URL }/images/features/features-feedback.png`} className={classes.featureItemImage} />
          </div>
        </div>

        <Divider light className={classes.divider} />
      </div>

      {/* Bottom CTA */}
      <div className={classes.bottomCta}>
        <Button
          variant="raised"
          className={classes.bottomCtaButton}
        >
          Start Now
        </Button>

        <Typography
          variant="caption"
          gutterBottom
          className={classes.bottomCtaButtonCaption}
        >
          login not required
        </Typography>
      </div>
    </div>
  )
}

export default withStyles(styles)(Home)
