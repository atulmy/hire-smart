// App Imports
import params from '../../setup/config/params'
import { authCheck } from '../../setup/helpers/utils'
import validate from '../../setup/helpers/validation'
import Job from './model'

// Get job by ID
export async function job({ params: { id } }) {
  if(authCheck(auth)) {
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
      const data = await Job.findOne({ _id: id })

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
export async function jobsByProject({ params: { projectId }, auth }) {
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
      const data = await Job.find({
        organizationId: auth.user.organizationId,
        projectId
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
