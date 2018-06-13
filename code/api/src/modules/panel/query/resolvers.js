// App Imports
import Panel from '../model'

// Get panel by ID
export async function get(parentValue, { id }) {
  return await Panel.findOne({ _id: id })
}

// Get by client
export async function getByClient(parentValue, { clientId }, { auth }) {
  if(auth.user && auth.user.id) {
    return await Panel.find({
      organizationId: auth.user.organizationId,
      clientId
    })
      .populate('organizationId')
      .populate('clientId')
  } else {
    throw new Error('Please login to view your panels.')
  }
}

// Get by organization
export async function getByOrganization(parentValue, {}, { auth }) {
  if(auth.user && auth.user.id) {
    return await Panel.find({
      organizationId: auth.user.organizationId
    })
      .populate('organizationId')
      .populate('clientId')
  } else {
    throw new Error('Please login to view your panels.')
  }
}

// Get by user
export async function getByUser(parentValue, {}, { auth }) {
  if(auth.user && auth.user.id) {
    return await Panel.find({ userId: auth.user.id })
  } else {
    throw new Error('Please login to view your panels.')
  }
}

// Get all
export async function getAll() {
  return await Panel.find()
}
