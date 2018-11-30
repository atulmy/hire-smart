// App Imports
import { authCheck } from '../../setup/helpers/utils'
import Activity from './model'

// Get by project
export async function activitiesByOrganization({ params: { projectId }, auth }) {
  if(authCheck(auth)) {
    const data = await Activity.find({
      organizationId: auth.user.organizationId
    })
      .sort({ createdAt: -1 })
      .populate('userId')

    return {
      data
    }
  }

  throw new Error('Please login to view activities.')
}

// Get by project
export async function activitiesByProject({ params: { projectId }, auth }) {
  if(authCheck(auth)) {
    const data = await Activity.find({
      organizationId: auth.user.organizationId,
      projectId
    })
      .sort({ createdAt: -1 })
      .populate('userId')

    return {
      data
    }
  }

  throw new Error('Please login to view activities.')
}

// Get by candidate
export async function activitiesByCandidate({ params: { candidateId }, auth }) {
  if(authCheck(auth)) {
    const data = await Activity.find({
      organizationId: auth.user.organizationId,
      candidateId
    })
      .sort({ createdAt: 1 })

    return {
      data
    }
  }

  throw new Error('Please login to view activities.')
}
