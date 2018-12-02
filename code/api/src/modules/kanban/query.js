// App Imports
import params from '../../setup/config/params'
import { authCheck } from '../../setup/helpers/utils'
import validate from '../../setup/helpers/validation'
import Kanban from './model'

// Get by ID
export async function kanban({ params: { id }, auth }) {
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
      const data = await Kanban.findOne({
        _id: id,
        organizationId: auth.user.organizationId
      })
        .populate({
          path: 'candidateId',
          populate: [{ path: 'projectId' }, { path: 'jobId' }]
        })
        .populate({
          path: 'interviews',
          populate: [{ path: 'interviewerId' }, { path: 'feedbackId' }]
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
export async function kanbansByProject({ params: { projectId }, auth }) {
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
      const data = await Kanban.find({
        organizationId: auth.user.organizationId,
        projectId
      })
        .populate({
          path: 'candidateId',
          populate: { path: 'jobId' }
        })
        .populate({
          path: 'interviews',
          populate: [{ path: 'interviewerId' }, { path: 'feedbackId' }]
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
