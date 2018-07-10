// Imports
import React from 'react'
import PropTypes from 'prop-types'

// Component
const InterviewInvite = ({ candidateName, date, organizationName, mode, note, userName }) => (
  <div>
    <p>Hi { candidateName },</p>

    <p>
      Your interview has been scheduled on <u>{ date }</u>.<br/>

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
InterviewInvite.propTypes = {
  candidateName: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  organizationName: PropTypes.string.isRequired
}

export default InterviewInvite

