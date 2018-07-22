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
  }

  throw new Error('Please login to view interviews.')
}

// Get by project
export async function getByProject(parentValue, { projectId }, { auth }) {
  if(auth.user && auth.user.id) {
    return await Interview.find({
      organizationId: auth.user.organizationId,
      projectId
    })
      .populate('organizationId')
      .populate('projectId')
      .populate('candidateId')
      .populate('interviewerId')
      .populate('userId')
  }

  throw new Error('Please login to view interviews.')
}
