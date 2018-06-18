// Imports
import React from 'react'
import PropTypes from 'prop-types'

// Component
const Reminder = ({ interviewerName, candidateName, date, organizationName, mode, note, userName }) => (
  <div>
    <p>Hi { interviewerName },</p>

    <p>This is a reminder for { candidateName }'s interview on { date } for { organizationName }</p>

    <p><strong>Interview Mode:</strong> { mode }</p>

    {
      note &&
      <p style={{ whiteSpace: 'pre-wrap' }}>
        <strong>Note</strong> <br />

        { note }
      </p>
    }

    <br/>

    <p>When you are done with the interview, you can give feedback by using following link:</p>
    <a href="http://hiresmart.app">Give Feedback</a>

    <br/>
    <br/>

    <p>
      Thanks, <br/>
      { userName }
    </p>
  </div>
)

// Component Properties
Reminder.propTypes = {
  interviewerName: PropTypes.string.isRequired,
  candidateName: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  organizationName: PropTypes.string.isRequired
}

export default Reminder

