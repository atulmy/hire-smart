// App Imports
import { authCheck } from '../../setup/helpers/utils'
import Interview from './model'

// Get interview by ID
export async function interview({ params: { id } }) {
  if(authCheck(auth)) {
    const data = await Interview.findOne({ _id: id })
      .populate('candidateId')

    return {
      data
    }
  }

  throw new Error('You are not allowed to perform this action.')
}

// Get by organization
export async function interviewsByOrganization({ auth }) {
  if(authCheck(auth)) {
    const data = await Interview.find({
      organizationId: auth.user.organizationId
    })

    return {
      data
    }
  }

  throw new Error('You are not allowed to perform this action.')
}

// Get by project
export async function interviewsByProject({ params: { projectId }, auth }) {
  if(authCheck(auth)) {
    const data = await Interview.find({
      organizationId: auth.user.organizationId,
      projectId
    })
      .populate('organizationId')
      .populate('projectId')
      .populate('candidateId')
      .populate('interviewerId')
      .populate('userId')

    return {
      data
    }
  }

  throw new Error('You are not allowed to perform this action.')
}
