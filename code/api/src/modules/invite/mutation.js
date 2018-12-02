// Imports
import React from 'react'

// App Imports
import params from '../../setup/config/params'
import { authCheck } from '../../setup/helpers/utils'
import validate from '../../setup/helpers/validation'
import Organization from '../organization/model'
import Activity from '../activity/model'
import Invite from '../invite/model'

// Email
import { send as sendEmail } from '../email/send'
import InviteTemplate from './email/Invite'

// Create invite to organization
export async function inviteToOrganization({ params: { name, email }, auth }) {
  if(authCheck(auth)) {
    // Validation rules
    const rules = [
      {
        data: { value: name },
        check: 'notEmpty',
        message: 'Please enter valid name.'
      },
      {
        data: { value: email },
        check: 'email',
        message: 'Please enter valid email.'
      }
    ]

    // Validate
    try {
      validate(rules)
    } catch(error) {
      throw new Error(error.message)
    }

    try {
      // Users exists with same email check
      const invited = await Invite.findOne({ email })

      if (!invited) {
        const invite = await Invite.create({
          organizationId: auth.user.organizationId,
          userId: auth.user._id,
          email,
          name,
          accepted: false
        })

        // Send invite email
        const organization = await Organization.findOne({ _id: auth.user.organizationId })

        await sendEmail({
          to: {
            name,
            email
          },
          from: auth.user,
          subject: 'You have been invited!',
          template:
            <InviteTemplate
              invitedTo={name}
              invitedBy={auth.user.name}
              invitedCode={invite._id}
              organizationName={organization.name}
            />,
          organizationId: auth.user.organizationId,
          userId: auth.user._id
        })

        // Log activity
        if(invite) {
          await Activity.create({
            organizationId: auth.user.organizationId,
            userId: auth.user._id,
            inviteId: invite._id,
            action: params.activity.types.create,
            message: `${ auth.user.name } invited ${ name } (${ email }) to the organization.`
          })
        }

        return {
          data: invite
        }
      } else {
        // User exists
        throw new Error(`The email ${ email } is already invited. Please ask the user to accept the invitation.`)
      }
    } catch(error) {
      throw new Error(params.common.message.error.server)
    }
  }

  throw new Error(params.user.message.error.auth)
}
