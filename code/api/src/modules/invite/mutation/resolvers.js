// Imports
import React from 'react'

// App Imports
import params from '../../../setup/config/params'
import Organization from '../../organization/model'
import Activity from '../../activity/model'
import Invite from '../../invite/model'
import { send as sendEmail } from '../../email/send'
import InviteTemplate from '../email/Invite'

// Create invite to organization
export async function invite(parentValue, { name, email }, { auth }) {
  if(auth.user && auth.user.id) {
    // Users exists with same email check
    const invited = await Invite.findOne({ email })

    if (!invited) {
      const invite = await Invite.create({
        organizationId: auth.user.organizationId,
        userId: auth.user.id,
        email,
        name,
        accepted: false
      })

      // Send invite email
      const organization = await Organization.findOne({ _id: auth.user.organizationId })

      sendEmail({
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
        userId: auth.user.id
      })

      // Log activity
      if(invite) {
        await Activity.create({
          organizationId: auth.user.organizationId,
          userId: auth.user.id,
          inviteId: invite._id,
          action: params.activity.types.create,
          message: `${ auth.user.name } invited ${ name } (${ email }) to the organization.`
        })
      }

      return invite
    } else {
      // User exists
      throw new Error(`The email ${ email } is already invited. Please ask the user to accept the invitation.`)
    }
  }

  throw new Error('You are not allowed to perform this action.')
}
