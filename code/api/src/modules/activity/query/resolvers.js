// App Imports
import Activity from '../model'

// Get by project
export async function getByOrganization(parentValue, { projectId }, { auth }) {
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

// Get by project
export async function getByProject(parentValue, { projectId }, { auth }) {
  if(auth.user && auth.user.id) {
    return await Activity.find({
      organizationId: auth.user.organizationId,
      projectId
    })
      .sort({ createdAt: -1 })
      .populate('userId')
  } else {
    throw new Error('Please login to view activities.')
  }
}

// Get by candidate
export async function getByCandidate(parentValue, { candidateId }, { auth }) {
  if(auth.user && auth.user.id) {
    return await Activity.find({
      organizationId: auth.user.organizationId,
      candidateId
    })
      .sort({ createdAt: 1 })
  } else {
    throw new Error('Please login to view activities.')
  }
}
