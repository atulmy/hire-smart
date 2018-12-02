// App Imports
import params from '../../setup/config/params'
import { authCheck } from '../../setup/helpers/utils'
import validate from '../../setup/helpers/validation'
import Organization from './model'

// Get by ID
export async function organization({ params: { id }, auth }) {
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

    const organization = await Organization.findOne({ _id: id })

    return {
      data: organization
    }
  }

  throw new Error(params.user.message.error.auth)
}

// Get by user
export async function organizationByUser({ auth }) {
  if(authCheck(auth)) {
    try {
      const organization = await Organization.findOne({ _id: auth.user.organizationId })

      return {
        data: organization
      }
    } catch(error) {
      throw new Error(params.common.message.error.server)
    }
  }

  throw new Error(params.user.message.error.auth)
}

// Get all
export async function organizationsByUser({ auth }) {
  if(authCheck(auth)) {
    try {
      const organizations = await Organization.find({ userId: auth.user._id })

      return {
        data: organizations
      }
    } catch(error) {
      throw new Error(params.common.message.error.server)
    }
  }

  throw new Error(params.user.message.error.auth)
}
