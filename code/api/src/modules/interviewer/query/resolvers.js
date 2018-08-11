// App Imports
import Interviewer from '../model'

// Get interviewer by ID
export async function get(parentValue, { id }) {
  return await Interviewer.findOne({ _id: id })
}

// Get by project
export async function getByProject(parentValue, { projectId }, { auth }) {
  if(auth.user && auth.user.id) {
    return await Interviewer.find({
      organizationId: auth.user.organizationId,
      projectId
    })
      .populate('organizationId')
      .populate('projectId')
  }

  throw new Error('You are not allowed to perform this action.')
}

// Get by organization
export async function getByOrganization(parentValue, {}, { auth }) {
  if(auth.user && auth.user.id) {
    return await Interviewer.find({
      organizationId: auth.user.organizationId
    })
      .populate('organizationId')
      .populate('projectId')
  }

  throw new Error('You are not allowed to perform this action.')
}

// Get all
export async function getAll() {
  return await Interviewer.find()
}
