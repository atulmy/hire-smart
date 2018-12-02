// App Imports
import params from '../../setup/config/params'
import { authCheck } from '../../setup/helpers/utils'
import validate from '../../setup/helpers/validation'
import Candidate from './model'

// Get candidate by ID
export async function candidate({ params: { id }}) {
  // Validation rules
  const rules = [
    {
      data: { value: id },
      check: 'notEmpty',
      message: params.common.message.error.invalidData
    }
  ]

  // Validate
  try {
    validate(rules)
  } catch(error) {
    throw new Error(error.message)
  }

  try {
    const data = await Candidate.findOne({ _id: id })
      .populate('projectId')
      .populate('jobId')

    return {
      data
    }
  } catch(error) {
    throw new Error(params.common.message.error.server)
  }
}

// Get by project
export async function candidatesByProject({ params: { projectId }, auth }) {
  if(authCheck(auth)) {
    // Validation rules
    const rules = [
      {
        data: { value: projectId },
        check: 'notEmpty',
        message: params.common.message.error.invalidData
      }
    ]

    // Validate
    try {
      validate(rules)
    } catch(error) {
      throw new Error(error.message)
    }

    try {
      const data = await Candidate.find({
        organizationId: auth.user.organizationId,
        projectId
      })
        .populate('projectId')
        .populate('jobId')

      return {
        data
      }
    } catch(error) {
      throw new Error(params.common.message.error.server)
    }
  }

  throw new Error(params.user.message.error.auth)
}

// Get by organization
export async function candidatesByOrganization({ auth }) {
  if(authCheck(auth)) {
    try {
      const data = await Candidate.find({
        organizationId: auth.user.organizationId
      })
        .populate('organizationId')
        .populate('projectId')
        .populate('jobId')

      return {
        data
      }
    } catch(error) {
      throw new Error(params.common.message.error.server)
    }
  }

  throw new Error(params.user.message.error.auth)
}
