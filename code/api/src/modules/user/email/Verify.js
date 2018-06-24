// Imports
import React from 'react'
import PropTypes from 'prop-types'

// Component
const Invite = ({ code, sender }) => (
  <React.Fragment>
    <p>Hi there,</p>

    <p>
      Please use the following verification code: <br />
      Code: <strong>{ code }</strong>
    </p>

    <p>Feel free to reply to this email for any assistance.</p>

    <p>
      Thanks, <br/>
      { sender }
    </p>
  </React.Fragment>
)

// Component Properties
Invite.propTypes = {
  code: PropTypes.number.isRequired,
  sender: PropTypes.string.isRequired
}

export default Invite

