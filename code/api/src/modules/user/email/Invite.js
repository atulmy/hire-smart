// Imports
import React from 'react'
import PropTypes from 'prop-types'

// Component
const Invite = ({ invitedTo, invitedBy, organizationName }) => (
  <React.Fragment>
    <p>Hi { invitedTo },</p>

    <p>I'm inviting you to join { organizationName } on HIRESMART, an application to streamline hiring process, scheduling interviews and tracking candidates.</p>

    <a href="http://hiresmart.app">Accept Invitation</a>

    <br/>
    <br/>

    <p>
      Thanks, <br/>
      { invitedBy }
    </p>
  </React.Fragment>
)

// Component Properties
Invite.propTypes = {
  invitedTo: PropTypes.string.isRequired,
  invitedBy: PropTypes.string.isRequired,
  organizationName: PropTypes.string.isRequired
}

export default Invite

