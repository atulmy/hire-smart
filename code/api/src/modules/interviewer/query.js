// App Imports
import { authCheck } from '../../setup/helpers/utils'
import Interviewer from './model'

// Get interviewer by ID
export async function interviewer({ params: { id }}) {
  const data = await Interviewer.findOne({ _id: id })

  return {
    data
  }
}

// Get by project
export async function interviewersByProject({ params: { projectId }, auth }) {
  if(authCheck(auth)) {
    const data = await Interviewer.find({
      organizationId: auth.user.organizationId,
      projectId
    })
      .populate('organizationId')
      .populate('projectId')

    return {
      data
    }
  }

  throw new Error('You are not allowed to perform this action.')
}

// Get by organization
export async function interviewersByOrganization({ auth }) {
  if(authCheck(auth)) {
    const data = await Interviewer.find({
      organizationId: auth.user.organizationId
    })
      .populate('organizationId')
      .populate('projectId')

    return {
      data
    }
  }

  throw new Error('You are not allowed to perform this action.')
}

// Get all
export async function interviewers() {
  const data = await Interviewer.find()

  return {
    data
  }
}
