// App Imports
import Invite from '../model'

// Get by id
export async function get(parentValue, { id }) {
  return await Invite.findOne({ _id: id, accepted: false })
    .populate('organizationId')
}

// Get by organization
export async function getByOrganization(parentValue, {}, { auth }) {
  if(auth.user && auth.user.id) {
    return await Invite.find({
      organizationId: auth.user.organizationId,
      accepted: false
    })
  }

  throw new Error('Please login to view invites.')
}
