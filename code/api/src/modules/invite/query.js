// App Imports
import params from '../../setup/config/params'
import { authCheck } from '../../setup/helpers/utils'
import validate from '../../setup/helpers/validation'
import Invite from './model'

// Get by id
export async function invite({ params: { id } }) {
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
    const data = await Invite.findOne({ _id: id, accepted: false })
      .populate('organizationId')

    return {
      data
    }
  } catch(error) {
    throw new Error(params.common.message.error.server)
  }
}

// Get by organization
export async function invitesByOrganization({ auth }) {
  if(authCheck(auth)) {
    try {
      const data = await Invite.find({
        organizationId: auth.user.organizationId,
        accepted: false
      })

      return {
        data
      }
    } catch(error) {
      throw new Error(params.common.message.error.server)
    }
  }

  throw new Error(params.user.message.error.auth)
}
