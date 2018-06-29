// Imports
import React from 'react'
import PropTypes from 'prop-types'

// App Imports
import { APP_URL } from '../../../setup/config/env'
import params from '../../../setup/config/params'

// Component
const Feedback = ({ interview, text, status }) => (
  <div>
    <p>Hi { interview.userId.name },</p>

    <p>A feedback was received for { interview.candidateId.name } given by { interview.interviewerId.name }.</p>

    <p>
      <strong>Interview Mode:</strong> { interview.mode } <br />

      <strong>Status:</strong> { status } <br />

      <strong>Feedback:</strong> { text }
    </p>

    <p><a href={APP_URL + params.web.routes.dashboard}><button>OPEN DASHBOARD</button></a></p>

    <p>Feel free to reply to this email for any assistance.</p>

    <p>
      Thanks, <br/>
      { params.site.name }
    </p>
  </div>
)

// Component Properties
Feedback.propTypes = {
  interview: PropTypes.object.isRequired
}

export default Feedback

