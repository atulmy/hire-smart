// Imports
import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment/moment'
import { CopyToClipboard } from 'react-copy-to-clipboard'

// UI Imports
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles/index'
import styles from './styles'

// App Imports
import params from '../../../../../setup/config/params'

// Component
const ViewFields = (props) => {
  const { classes, interview } = props

  let modeName = (mode) => {
    return params.interview.modes.filter(item => item.key === mode)[0].name
  }

  return (
    <React.Fragment>
      {/* Date and time */}
      <div className={classes.item}>
        <Typography variant={'caption'} gutterBottom>
          Date and time
        </Typography>

        <Typography gutterBottom>
          { moment(new Date(interview.dateTime)).format(`${ params.date.format.nice.date }, ${ params.date.format.nice.time }`) }
        </Typography>
      </div>

      {/* Interviewer */}
      <div className={classes.item}>
        <Typography variant={'caption'} gutterBottom>
          Interviewer
        </Typography>

        <Typography gutterBottom>
          { interview.interviewerId.name }
        </Typography>

        {/* Interviewer Email / Mobile */}
        <Typography gutterBottom>
          <CopyToClipboard text={interview.interviewerId.email}>
            <span title={'Click to copy'} className={classes.clickToCopy}>{ interview.interviewerId.email }</span>
          </CopyToClipboard>

          {' '}&bull;{' '}

          <CopyToClipboard text={interview.interviewerId.mobile}>
            <span title={'Click to copy'} className={classes.clickToCopy}>{ interview.interviewerId.mobile }</span>
          </CopyToClipboard>
        </Typography>
      </div>

      {/* Feedback */}
      {
        interview.feedbackId &&
        <div className={classes.item}>
          <Typography variant={'caption'} gutterBottom>
            Feedback
          </Typography>

          <Typography gutterBottom>
            <span style={{ textTransform: 'capitalize' }}>{ interview.feedbackId.status }</span>. { interview.feedbackId.text }
          </Typography>
        </div>
      }

      {/* Notes */}
      {
        interview.note &&
        <div className={classes.itemLast}>
          <Typography variant={'caption'} gutterBottom>
            Notes
          </Typography>

          <Typography gutterBottom className={classes.multiLine}>
            { interview.note }
          </Typography>
        </div>
      }

      {/* Mode */}
      <div className={classes.itemLast}>
        <Typography variant={'caption'} gutterBottom>
          Mode
        </Typography>

        <Typography gutterBottom>
          { modeName(interview.mode) }
        </Typography>
      </div>
    </React.Fragment>
  )
}

// Component Properties
ViewFields.propTypes = {
  classes: PropTypes.object.isRequired,
  interview: PropTypes.object.isRequired
}

export default withStyles(styles)(ViewFields)

