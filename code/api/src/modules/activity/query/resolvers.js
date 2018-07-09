// App Imports
import Activity from '../model'

// Get by client
export async function getByOrganization(parentValue, { clientId }, { auth }) {
  if(auth.user && auth.user.id) {
    return await Activity.find({
      organizationId: auth.user.organizationId
    })
      .sort({ createdAt: -1 })
      .populate('userId')
  } else {
    throw new Error('Please login to view activities.')
  }
}

// Get by client
export async function getByClient(parentValue, { clientId }, { auth }) {
  if(auth.user && auth.user.id) {
    return await Activity.find({
      organizationId: auth.user.organizationId,
      clientId
    })
      .sort({ createdAt: -1 })
      .populate('userId')
  } else {
    throw new Error('Please login to view activities.')
  }
}
