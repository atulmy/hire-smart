// Imports
import React from 'react'

// UI Imports
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button'
import { withStyles } from 'material-ui/styles'
import styles from './styles'

// App Imports

// Component
const Home = (props) => (
  <div>
    <div className={props.classes.hero}>
      <Typography
        variant="display4"
        title={'Hire Smart'}
        className={props.classes.title}
      >
        Hire<spam className={props.classes.titleHighlight}>Smart</spam>
      </Typography>

      <Typography
        variant="headline"
        gutterBottom
        className={props.classes.subTitle}
      >
        Schedule and manage interviews efficiently.
      </Typography>

      <Button
        variant="raised"
        className={props.classes.button}
      >
        Start Now
      </Button>

      <Typography
        variant="caption"
        gutterBottom
        className={props.classes.buttonCaption}
      >
        login not required
      </Typography>
    </div>

    <div className={props.classes.features}>
      <div className={props.classes.featureItem}>
        <div className={props.classes.featureItemLeft}>
          <Typography
            variant="display1"
            title={'Hire Smart'}
            gutterBottom
            className={props.classes.featureItemTitle}
          >
            Journey of candidate
          </Typography>

          <Typography
            variant="subheading"
            className={props.classes.featureItemSubTitle}
          >
            A candidate is a potential future employee. The journey matters as soon as you consider the profile and we enable you to have a holistic view at every step.
          </Typography>
        </div>

        <div className={props.classes.featureItemRight}>
          <img src={`/images/features/features-journey.png`} className={props.classes.featureItemImage} />
        </div>
      </div>

      <div className={props.classes.featureItem}>
        <div className={props.classes.featureItemLeft}>
          <img src={`/images/features/features-current-status.png`} className={props.classes.featureItemImage} />
        </div>

        <div className={props.classes.featureItemRight}>
          <Typography
            variant="display1"
            title={'Hire Smart'}
            gutterBottom
            className={props.classes.featureItemTitle}
          >
            Current status of the candidate
          </Typography>

          <Typography
            variant="subheading"
            className={props.classes.featureItemSubTitle}
          >
            We enable you to easily track the current status of the candidate so you have better control and make proper decisions.
          </Typography>
        </div>
      </div>

      <div className={props.classes.featureItem}>
        <div className={props.classes.featureItemLeft}>
          <Typography
            variant="display1"
            title={'Hire Smart'}
            gutterBottom
            className={props.classes.featureItemTitle}
          >
            Get feedback from panel
          </Typography>

          <Typography
            variant="subheading"
            className={props.classes.featureItemSubTitle}
          >
            Interviewer can provide a subjective and objective feedback for the candidate with a great ease in turn helping you to make the right decision for hiring.
          </Typography>
        </div>

        <div className={props.classes.featureItemRight}>
          <img src={`/images/features/features-feedback.png`} className={props.classes.featureItemImage} />
        </div>
      </div>
    </div>
  </div>
)

export default withStyles(styles)(Home)
