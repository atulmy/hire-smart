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
import { WEB_URL } from '../../../setup/config/env'
import routes from '../../../setup/routes'
import { messageShow } from '../../common/api/actions'
import { startNow } from '../../user/api/actions/mutation'
import AuthCheck from '../../auth/AuthCheck'

// Component
class Home extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      redirect: false
    }
  }

  redirectToggle = (redirect) => {
    this.setState({ redirect })
  }

  startNow = event => {
    event.preventDefault()

    const { startNow, user, history } = this.props

    if(user.isAuthenticated) {
      // User is already logged in, redirect to dashboard
      history.push(routes.dashboard.path)
    } else {
      this.redirectToggle(true)

      // Create new demo user and redirect to dashboard
      startNow()
    }
  }

  startNowText = () => {
    const { user: { isAuthenticated, isLoading } } = this.props

    return isLoading ? `Please Wait..` : (isAuthenticated ? `Open Dashboard` : `Start Now`)
  }

  render() {
    const { classes, user: { isAuthenticated, isLoading } } = this.props
    const { redirect } = this.state

    return(
      <div>
        {/* Hero */}
        <div className={classes.hero}>
          <Typography
            variant={'h1'}
            title={'HireSmart'}
            className={classes.title}
          >
            Hire<span className={classes.titleHighlight}>Smart</span>
          </Typography>

          <Typography
            variant={'h5'}
            gutterBottom
            className={classes.subTitle}
          >
            Streamline your hiring process, scheduling interviews and tracking candidates.
          </Typography>

          {/* Hero CTA */}
          <Button
            variant={'contained'}
            className={classes.button}
            onClick={this.startNow}
            disabled={isLoading}
          >
            { this.startNowText() }
          </Button>

          { redirect && <AuthCheck /> }

          {
            !isAuthenticated &&
            <Typography
              variant={'caption'}
              gutterBottom
              className={classes.buttonCaption}
            >
              login not required
            </Typography>
          }
        </div>

        {/* Features */}
        <div className={classes.features}>
          <div className={classes.featureItem}>
            <div className={classes.featureItemLeft}>
              <Typography
                variant={'h4'}
                gutterBottom
                className={classes.featureItemTitle}
              >
                Journey of candidate
              </Typography>

              <Typography
                variant={'subtitle1'}
                className={classes.featureItemSubTitle}
              >
                A candidate is a potential future employee. The journey matters as soon as you consider the profile and we enable you to have a holistic view at every step.
              </Typography>
            </div>

            <div className={classes.featureItemRight}>
              <img src={`${ WEB_URL }/images/home/features-journey.svg`} className={classes.featureItemImage} alt='Journey of candidate' />
            </div>
          </div>

          <Divider light className={classes.divider} />

          <div className={classes.featureItem}>
            <div className={classes.featureItemLeft}>
              <img src={`${ WEB_URL }/images/home/features-current-status.svg`} className={classes.featureItemImage} alt='Current status of the candidate' />
            </div>

            <div className={classes.featureItemRight}>
              <Typography
                variant={'h4'}
                gutterBottom
                className={classes.featureItemTitle}
              >
                Current status of the candidate
              </Typography>

              <Typography
                variant={'subtitle1'}
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
                variant={'h4'}
                gutterBottom
                className={classes.featureItemTitle}
              >
                Get feedback from interviewer
              </Typography>

              <Typography
                variant={'subtitle1'}
                className={classes.featureItemSubTitle}
              >
                Interviewer can provide a subjective and objective feedback for the candidate with a great ease in turn helping you to make the right decision for hiring.
              </Typography>
            </div>

            <div className={classes.featureItemRight}>
              <img src={`${ WEB_URL }/images/home/features-feedback.svg`} className={classes.featureItemImage} alt='Get feedback from interviewer' />
            </div>
          </div>

          <Divider light className={classes.divider} />
        </div>

        {/* Bottom CTA */}
        <div className={classes.bottomCta}>
          <div style={{ padding: '0 5rem' }}>
            <img src={`${ WEB_URL }/images/illustrations/organize-resume.svg`} style={{ width: 275, marginBottom: '3rem' }} alt='start now' />

            <Typography
              variant={'h5'}
              gutterBottom
              className={classes.featureItemTitle}
            >
              From the moment you get a resume to either the candidate is selected or rejected, HIRESMART enables you manage everything in between efficiently.
            </Typography>
          </div>

          <Button
            variant={'contained'}
            className={classes.bottomCtaButton}
            onClick={this.startNow}
            disabled={isLoading}
          >
            { this.startNowText() }
          </Button>

          {
            !isAuthenticated &&
            <Typography
              variant={'caption'}
              gutterBottom
              className={classes.bottomCtaButtonCaption}
            >
              login not required
            </Typography>
          }
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
