// App Imports
import params from '../../setup/config/params'
import { authCheck } from '../../setup/helpers/utils'
import validate from '../../setup/helpers/validation'
import Kanban from './model'

// Get by ID
export async function kanban({ params: { id }, fields, auth }) {
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
        .select(fields.kanban)
        .populate({
          path: 'candidateId',
          select: fields.candidate,
          populate: [
            { path: 'projectId', select: fields.project },
            { path: 'jobId', select: fields.job }
          ]
        })
        .populate({
          path: 'interviews',
          select: fields.interview,
          populate: [
            { path: 'interviewerId', select: fields.interviewer },
            { path: 'feedbackId', select: fields.feedback }
          ]
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

// Get by project
export async function kanbansByProject({ params: { projectId }, fields, auth }) {
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
        .select(fields.kanban)
        .populate({
          path: 'candidateId',
          select: fields.candidate,
          populate: {
            path: 'jobId',
            select: fields.job
          }
        })
        .populate({
          path: 'interviews',
          select: fields.interview,
          populate: [
            {
              path: 'interviewerId',
              select: fields.interviewer
            },
            {
              path: 'feedbackId',
              select: fields.feedback
            }
          ]
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
