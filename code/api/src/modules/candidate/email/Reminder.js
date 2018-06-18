// Imports
import React from 'react'
import PropTypes from 'prop-types'

// Component
const Reminder = ({ candidateName, date, organizationName, mode, note, userName }) => (
  <div>
    <p>Hi { candidateName },</p>

    <p>This is a reminder for your interview on { date } for { organizationName }</p>

    <p><strong>Interview Mode:</strong> { mode }</p>

    {
      note &&
      <p style={{ whiteSpace: 'pre-wrap' }}>
        <strong>Note</strong> <br />

        { note }
      </p>
    }

    <br/>

    <p>
      Thanks, <br/>
      { userName }
    </p>
  </div>
)

// Component Properties
Reminder.propTypes = {
  candidateName: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  organizationName: PropTypes.string.isRequired
}

export default Reminder

