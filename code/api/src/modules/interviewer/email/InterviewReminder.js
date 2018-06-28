// Imports
import React from 'react'
import PropTypes from 'prop-types'

// App Imports
import { APP_URL } from '../../../setup/config/env'
import params from '../../../setup/config/params'

// Component
const InterviewReminder = ({ interviewId, interviewerName, candidateName, date, organizationName, mode, note, userName }) => (
  <div>
    <p>Hi { interviewerName },</p>

    <p>
      This is an invitation to conduct { candidateName }'s interview on <u>{ date }</u> for { organizationName }. <br />

      <strong>Interview Mode:</strong> { mode }

      {
        note &&
        <React.Fragment>
          <br />

          <span style={{ whiteSpace: 'pre-wrap' }}>
            <strong>Note:</strong> { note }
          </span>
        </React.Fragment>
      }
    </p>

    <p>
      After conducting the interview, please provide your feedback for { candidateName } by using following link: <br />

      <a href={`${ APP_URL + params.web.routes.feedback  }/${ interviewId }`}><button>GIVE FEEDBACK</button></a>
    </p>

    <p>Feel free to reply to this email for any assistance.</p>

    <p>
      Thanks, <br/>
      { userName }
    </p>
  </div>
)

// Component Properties
InterviewReminder.propTypes = {
  interviewerName: PropTypes.string.isRequired,
  candidateName: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  organizationName: PropTypes.string.isRequired
}

export default InterviewReminder

