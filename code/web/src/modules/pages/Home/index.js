// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// UI Imports
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'

// App Imports
import { APP_URL } from '../../../setup/config/env'
import routes from '../../../setup/routes'
import { startNow } from '../../user/api/actions'

// Component
class Home extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: false,

      messageText: '',
      messageShow: false
    }
  }

  messageShow = (messageText) => {
    this.setState({ messageText, messageShow: true })
  }

  messageHide = () => {
    this.setState({ messageShow: false })
  }

  loadingToggle = (isLoading) => {
    this.setState({ isLoading })
  }

  start = (event) => {
    event.preventDefault()

    this.loadingToggle(true)

    this.messageShow('Please wait...')

    this.props.startNow()
  }

  render() {
    const { classes } = this.props

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
            {/* Schedule and manage interviews efficiently. */}
          </Typography>

          <Button
            variant={'raised'}
            className={classes.button}
            onClick={this.start}
          >
            Start Now
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
            onClick={this.start}
          >
            Start Now
          </Button>

          <Typography
            variant={'caption'}
            gutterBottom
            className={classes.bottomCtaButtonCaption}
          >
            login not required
          </Typography>
        </div>

        {/* Message */}
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.messageShow}
          autoHideDuration={3000}
          onClose={this.messageHide}
          message={this.state.messageText}
          action={[
            <IconButton
              key={'close'}
              color={'inherit'}
              onClick={this.messageHide}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </div>
    )
  }
}

// Component Properties
Home.propTypes = {
  classes: PropTypes.object.isRequired
}

// Component State
function homesState(state) {
  return {
    user: state.user
  }
}

export default connect(homesState, { startNow })(withStyles(styles)(Home))
