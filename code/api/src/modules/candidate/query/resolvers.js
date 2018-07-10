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
      .populate('projectId')
      .populate('jobId')
  } else {
    throw new Error('Please login to view your candidates.')
  }
}

// Get all
export async function getAll() {
  return await Candidate.find()
}
