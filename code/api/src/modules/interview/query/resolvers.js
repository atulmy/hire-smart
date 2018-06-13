// App Imports
import Interview from '../model'

// Get interview by ID
export async function get(parentValue, { id }) {
  return await Interview.findOne({ _id: id })
}

// Get by user
export async function getByUser(parentValue, {}, { auth }) {
  if(auth.user && auth.user.id) {
    return await Interview.find({ userId: auth.user.id })
  } else {
    throw new Error('Please login to view interviews.')
  }
}

// Get by organization
export async function getByOrganization(parentValue, {}, { auth }) {
  if(auth.user && auth.user.id) {
    return await Interview.find({
      organizationId: auth.user.organizationId
    })
  } else {
    throw new Error('Please login to view interviews.')
  }
}

// Get by client
export async function getByClient(parentValue, { clientId }, { auth }) {
  if(auth.user && auth.user.id) {
    return await Interview.find({
      organizationId: auth.user.organizationId,
      clientId
    })
      .populate('organizationId')
      .populate('clientId')
      .populate('candidateId')
      .populate('panelId')
      .populate('userId')
  } else {
    throw new Error('Please login to view interviews.')
  }
}

// Get all
export async function getAll() {
  return await Interview.find()
}
