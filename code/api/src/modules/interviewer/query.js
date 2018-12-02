// App Imports
import params from '../../setup/config/params'
import { authCheck } from '../../setup/helpers/utils'
import validate from '../../setup/helpers/validation'
import Interviewer from './model'

// Get interviewer by ID
export async function interviewer({ params: { id }}) {
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
      const data = await Interviewer.findOne({ _id: id })

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
export async function interviewersByProject({ params: { projectId }, fields = { interviewer: [], project: [] }, auth }) {
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
      const data = await Interviewer.find({
        organizationId: auth.user.organizationId,
        projectId
      })
        .select(fields.interviewer)
        .populate({ path: 'projectId', select: fields.project })

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
export async function interviewersByOrganization({ fields = { interviewer: [], project: [] }, auth }) {
  if(authCheck(auth)) {
    try {
      const data = await Interviewer.find({
        organizationId: auth.user.organizationId
      })
        .select(fields.interviewer)
        .populate({ path: 'projectId', select: fields.project })

      return {
        data
      }
    } catch(error) {
      throw new Error(params.common.message.error.server)
    }
  }

  throw new Error(params.user.message.error.auth)
}
