// Imports
import React from 'react'
import PropTypes from 'prop-types'

// App Imports
import { WEB_URL, API_URL } from '../../../setup/config/env'
import params from '../../../setup/config/params'

// Component
const InterviewInvite = ({ interviewId, interviewerName, candidateId, candidateName, date, organizationName, mode, note, userName }) => (
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
      Candidate's resume: <a href={`${ API_URL }/download/${ candidateId }`}>DOWNLOAD</a>
    </p>

    <p>
      After conducting the interview, please provide your feedback for { candidateName } by using following link: <br />

      <a href={`${ WEB_URL + params.web.routes.feedback  }/${ interviewId }`}>GIVE FEEDBACK</a>
    </p>

    <p>Feel free to reply to this email for any assistance.</p>

    <p>
      Thanks, <br/>
      { userName }
    </p>
  </div>
)

// Component Properties
InterviewInvite.propTypes = {
  interviewerName: PropTypes.string.isRequired,
  candidateName: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  organizationName: PropTypes.string.isRequired
}

export default InterviewInvite

