// App Imports
import params from '../../setup/config/params'
import { authCheck } from '../../setup/helpers/utils'
import validate from '../../setup/helpers/validation'
import Interview from './model'

// Get interview by ID
export async function interview({ params: { id } }) {
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
    const data = await Interview.findOne({ _id: id })
      .populate('candidateId')

    return {
      data
    }
  } catch(error) {
    throw new Error(params.common.message.error)
  }
}

// Get by organization
export async function interviewsByOrganization({ auth }) {
  if(authCheck(auth)) {
    try {
      const data = await Interview.find({
        organizationId: auth.user.organizationId
      })

      return {
        data
      }
    } catch(error) {
      throw new Error(params.common.message.error)
    }
  }

  throw new Error(params.user.message.error.auth)
}

// Get by project
export async function interviewsByProject({ params: { projectId }, auth }) {
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
    } catch(error) {
      throw new Error(params.common.message.error)
    }
  }

  throw new Error(params.user.message.error.auth)
}
