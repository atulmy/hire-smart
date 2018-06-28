// App Imports
import Interview from '../model'

// Get interview by ID
export async function get(parentValue, { id }) {
  return await Interview.findOne({ _id: id })
    .populate('candidateId')
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
      .populate('interviewerId')
      .populate('userId')
  } else {
    throw new Error('Please login to view interviews.')
  }
}
