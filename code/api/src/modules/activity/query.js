// App Imports
import params from '../../setup/config/params'
import { authCheck } from '../../setup/helpers/utils'
import validate from '../../setup/helpers/validation'
import Activity from './model'

// Get by project
export async function activitiesByOrganization({ fields, auth }) {
  if(authCheck(auth)) {
    try {
      const data = await Activity.find({
        organizationId: auth.user.organizationId
      })
        .sort({ createdAt: -1 })
        .select(fields)

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
export async function activitiesByProject({ params: { projectId }, fields, auth }) {
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
      const data = await Activity.find({
        organizationId: auth.user.organizationId,
        projectId
      })
        .sort({ createdAt: -1 })
        .select(fields)

      return {
        data
      }
    } catch(error) {
      throw new Error(params.common.message.error.server)
    }
  }

  throw new Error(params.user.message.error.auth)
}

// Get by candidate
export async function activitiesByCandidate({ params: { candidateId }, fields, auth }) {
  if(authCheck(auth)) {
    // Validation rules
    const rules = [
      {
        data: { value: candidateId },
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
      const data = await Activity.find({
        organizationId: auth.user.organizationId,
        candidateId
      })
        .sort({ createdAt: 1 })
        .select(fields)

      return {
        data
      }
    } catch(error) {
      throw new Error(params.common.message.error.server)
    }
  }

  throw new Error(params.user.message.error.auth)
}
