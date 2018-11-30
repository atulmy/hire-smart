// App Imports
import { authCheck } from '../../setup/helpers/utils'
import Candidate from './model'

// Get candidate by ID
export async function candidate({ params: { id }}) {
  const data = await Candidate.findOne({ _id: id })
    .populate('projectId')
    .populate('jobId')

  return {
    data
  }
}

// Get by project
export async function candidatesByProject({ params: { projectId }, auth }) {
  if(authCheck(auth)) {
    const data = await Candidate.find({
      organizationId: auth.user.organizationId,
      projectId
    })
      .populate('projectId')
      .populate('jobId')

    return {
      data
    }
  }

  throw new Error('You are not allowed to perform this action.')
}

// Get by organization
export async function candidatesByOrganization({ auth }) {
  if(authCheck(auth)) {
    const data = await Candidate.find({
      organizationId: auth.user.organizationId
    })
      .populate('organizationId')
      .populate('projectId')
      .populate('jobId')

    return {
      data
    }
  }

  throw new Error('You are not allowed to perform this action.')
}

// Get all
export async function candidates() {
  const data = await Candidate.find()

  return {
    data
  }
}
