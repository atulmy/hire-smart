// App Imports
import params from '../../setup/config/params'
import { authCheck } from '../../setup/helpers/utils'
import validate from '../../setup/helpers/validation'
import Interview from './model'

// Get interview by ID
export async function interview({ params: { id }, fields }) {
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
      .select(fields.interview)
      .populate({ path: 'candidateId', select: fields.candidate })

    return {
      data
    }
  } catch(error) {
    throw new Error(params.common.message.error.server)
  }
}

// Get by organization
export async function interviewsByOrganization({ fields, auth }) {
  if(authCheck(auth)) {
    try {
      const data = await Interview.find({
        organizationId: auth.user.organizationId
      })
        .select(fields.interview)
        .populate({ path: 'candidateId', select: fields.candidate })
        .populate({ path: 'interviewerId', select: fields.candidate })

      return {
        data
      }
    } catch(error) {
      throw new Error(params.common.message.error.server)
    }
  }

  throw new Error(params.user.message.error.auth)
}

// Get by project
export async function interviewsByProject({ params: { projectId }, fields, auth }) {
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
        .select(fields.interview)
        .populate({ path: 'projectId', select: fields.projectId })
        .populate({ path: 'candidateId', select: fields.candidate })
        .populate({ path: 'interviewerId', select: fields.candidate })

      return {
        data
      }
    } catch(error) {
      throw new Error(params.common.message.error.server)
    }
  }

  throw new Error(params.user.message.error.auth)
}
