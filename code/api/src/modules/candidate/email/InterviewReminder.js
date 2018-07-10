// Imports
import React from 'react'
import PropTypes from 'prop-types'

// Component
const InterviewReminder = ({ candidateName, date, organizationName, mode, note, userName }) => (
  <div>
    <p>Hi { candidateName },</p>

    <p>
      This is a reminder for your interview on <u>{ date }</u>. <br/>

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

    <p>Feel free to reply to this email for any assistance.</p>

    <p>
      Thanks, <br/>
      { userName }
    </p>
  </div>
)

// Component Properties
InterviewReminder.propTypes = {
  candidateName: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  organizationName: PropTypes.string.isRequired
}

export default InterviewReminder

