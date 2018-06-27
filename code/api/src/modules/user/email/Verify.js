// Imports
import React from 'react'
import PropTypes from 'prop-types'

// App Imports
import params from '../../../setup/config/params'

// Component
const Invite = ({ code }) => (
  <React.Fragment>
    <p>Hi there,</p>

    <p>
      Please use the following verification code: <br />
      Code: <strong>{ code }</strong>
    </p>

    <p>Feel free to reply to this email for any assistance.</p>

    <p>
      Thanks, <br/>
      { params.site.name }
    </p>
  </React.Fragment>
)

// Component Properties
Invite.propTypes = {
  code: PropTypes.number.isRequired
}

export default Invite

