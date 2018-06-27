// Imports
import React from 'react'
import PropTypes from 'prop-types'

// App Imports
import params from '../../../setup/config/params'

// Component
const Invite = ({ invitedTo, invitedBy, invitedCode, organizationName }) => (
  <React.Fragment>
    <p>Hi { invitedTo },</p>

    <p>I'm inviting you to join { organizationName } on HIRESMART, an application to streamline hiring process, scheduling interviews and tracking candidates.</p>

    <p><a href={`${ params.site.url+params.web.routes.invite }/${ invitedCode }`}>Accept Invitation</a></p>

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
