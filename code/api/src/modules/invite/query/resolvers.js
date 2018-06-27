// App Imports
import Invite from '../model'

// Get by id
export async function get(parentValue, { id }) {
  return await Invite.findOne({ _id: id })
    .populate('organizationId')
}
