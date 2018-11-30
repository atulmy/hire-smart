// App Imports
import { authCheck } from '../../setup/helpers/utils'
import Invite from './model'

// Get by id
export async function invite({ params: { id } }) {
  const data = await Invite.findOne({ _id: id, accepted: false })
    .populate('organizationId')

  return {
    data
  }
}

// Get by organization
export async function invitesByOrganization({ auth }) {
  if(authCheck(auth)) {
    const data = await Invite.find({
      organizationId: auth.user.organizationId,
      accepted: false
    })

    return {
      data
    }
  }

  throw new Error('You are not allowed to perform this action.')
}
