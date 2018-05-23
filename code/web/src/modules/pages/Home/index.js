// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// UI Imports
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'

// App Imports
import { APP_URL } from '../../../setup/config/env'
import routes from '../../../setup/routes'
import { messageShow } from '../../common/api/actions'
import { startNow } from '../../user/api/actions'

// Component
class Home extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: false,
    }
  }

  loadingToggle = (isLoading) => {
    this.setState({ isLoading })
  }

  startNow = (event) => {
    event.preventDefault()

    const { messageShow, startNow, user, history } = this.props

    if(user.isAuthenticated) {
      // User is already logged in, redirect to dashboard
      history.push(routes.dashboard.path)
    } else {
      // Create new demo user and redirect to dashboard
      this.loadingToggle(true)

      messageShow('Please wait...')

      startNow()
        .then(() => {
          if (user.error && user.error.length > 0) {
            messageShow(user.error)
          } else {
            messageShow('You are now logged in as a new demo user.')

            history.push(routes.dashboard.path)
          }
        })
        .catch(() => {
          messageShow('There was some error. Please try again.')
        })
        .then(() => {
          this.loadingToggle(false)
        })
    }
  }

  render() {
    const { classes } = this.props
    const { isLoading } = this.state

    return(
      <div>
        {/* Hero */}
        <div className={classes.hero}>
          <Typography
            variant={'display4'}
            title={'Hire Smart'}
            className={classes.title}
          >
            Hire<span className={classes.titleHighlight}>Smart</span>
          </Typography>

          <Typography
            variant={'headline'}
            gutterBottom
            className={classes.subTitle}
          >
            Streamline your hiring process, scheduling interviews and tracking candidates.
          </Typography>

          {/* Hero CTA */}
          <Button
            variant={'raised'}
            className={classes.button}
            onClick={this.startNow}
            disabled={isLoading}
          >
            { !isLoading ? `Start Now` : `Please Wait..` }
          </Button>

          <Typography
            variant={'caption'}
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
                variant={'display1'}
                gutterBottom
                className={classes.featureItemTitle}
              >
                Journey of candidate
              </Typography>

              <Typography
                variant={'subheading'}
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
                variant={'display1'}
                gutterBottom
                className={classes.featureItemTitle}
              >
                Current status of the candidate
              </Typography>

              <Typography
                variant={'subheading'}
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
                variant={'display1'}
                gutterBottom
                className={classes.featureItemTitle}
              >
                Get feedback from panel
              </Typography>

              <Typography
                variant={'subheading'}
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
            variant={'raised'}
            className={classes.bottomCtaButton}
            onClick={this.startNow}
            disabled={isLoading}
          >
            { !isLoading ? `Start Now` : `Please Wait..` }
          </Button>

          <Typography
            variant={'caption'}
            gutterBottom
            className={classes.bottomCtaButtonCaption}
          >
            login not required
          </Typography>
        </div>
      </div>
    )
  }
}

// Component Properties
Home.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  startNow: PropTypes.func.isRequired,
  messageShow: PropTypes.func.isRequired
}

// Component State
function homesState(state) {
  return {
    user: state.user
  }
}

export default connect(homesState, { startNow, messageShow })(withStyles(styles)(Home))
