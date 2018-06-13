// App Imports
import Candidate from '../model'

// Get candidate by ID
export async function get(parentValue, { id }) {
  return await Candidate.findOne({ _id: id })
}

// Get by client
export async function getByClient(parentValue, { clientId }, { auth }) {
  if(auth.user && auth.user.id) {
    return await Candidate.find({
      organizationId: auth.user.organizationId,
      clientId
    })
  } else {
    throw new Error('Please login to view your candidates.')
  }
}

// Get by organization
export async function getByOrganization(parentValue, {}, { auth }) {
  if(auth.user && auth.user.id) {
    return await Candidate.find({
      organizationId: auth.user.organizationId
    })
      .populate('organizationId')
      .populate('clientId')
  } else {
    throw new Error('Please login to view your candidates.')
  }
}

// Get by user
export async function getByUser(parentValue, {}, { auth }) {
  if(auth.user && auth.user.id) {
    return await Candidate.find({ userId: auth.user.id })
  } else {
    throw new Error('Please login to view your candidates.')
  }
}

// Get all
export async function getAll() {
  return await Candidate.find()
}
