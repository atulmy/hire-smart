// App Imports
import Candidate from '../model'

// Get candidate by ID
export async function get(parentValue, { id }) {
  return await Candidate.findOne({ _id: id })
    .populate('projectId')
    .populate('jobId')
}

// Get by project
export async function getByProject(parentValue, { projectId }, { auth }) {
  if(auth.user && auth.user.id) {
    return await Candidate.find({
      organizationId: auth.user.organizationId,
      projectId
    })
      .populate('projectId')
      .populate('jobId')
  }

  throw new Error('You are not allowed to perform this action.')
}

// Get by organization
export async function getByOrganization(parentValue, {}, { auth }) {
  if(auth.user && auth.user.id) {
    return await Candidate.find({
      organizationId: auth.user.organizationId
    })
      .populate('organizationId')
      .populate('projectId')
      .populate('jobId')
  }

  throw new Error('You are not allowed to perform this action.')
}

// Get all
export async function getAll() {
  return await Candidate.find()
}
