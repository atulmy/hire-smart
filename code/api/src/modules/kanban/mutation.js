// Imports
import isEmpty from 'lodash/isEmpty'

// App Imports
import params from '../../setup/config/params'
import { authCheck } from '../../setup/helpers/utils'
import validate from '../../setup/helpers/validation'
import Activity from '../activity/model'
import Kanban from './model'

// Create
export async function kanbanCreate({ params: { projectId, candidateId, interviews = [], status, highlight = false }, auth }) {
  if(authCheck(auth)) {
    // Validation rules
    const rules = [
      {
        data: { value: projectId },
        check: 'notEmpty',
        message: params.common.message.error.invalidData
      },
      {
        data: { value: candidateId },
        check: 'notEmpty',
        message: params.common.message.error.invalidData
      },
      {
        data: { value: status },
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
      const data = await Kanban.create({
        organizationId: auth.user.organizationId,
        userId: auth.user._id,
        projectId,
        candidateId,
        interviews,
        status,
        highlight
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

// Update
export async function kanbanUpdate({ params: { id, interviews, status, highlight }, auth }) {
  if(authCheck(auth) && !isEmpty(id)) {
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
      const data = await Kanban.updateOne(
        { _id: id },
        {
          $set: {
            projectId,
            interviews,
            status,
            highlight
          }
        }
      )

      return {
        data
      }
    } catch(error) {
      throw new Error(params.common.message.error.server)
    }
  }

  throw new Error(params.user.message.error.auth)
}

// Update status
export async function kanbanUpdateStatus({ params: { id, status }, auth }) {
  if(authCheck(auth)) {
    // Validation rules
    const rules = [
      {
        data: { value: id },
        check: 'notEmpty',
        message: params.common.message.error.invalidData
      },
      {
        data: { value: status },
        check: 'notEmpty',
        message: 'Please enter valid status.'
      }
    ]

    // Validate
    try {
      validate(rules)
    } catch(error) {
      throw new Error(error.message)
    }

    try {
      const updated = await Kanban.updateOne(
        { _id: id },
        {
          $set: {
            status
          }
        }
      )

      // Log activity
      if(updated) {
        const kanban = await Kanban.findOne({ _id: id }).populate('candidateId')

        await Activity.create({
          organizationId: auth.user.organizationId,
          userId: auth.user._id,
          projectId: kanban.projectId,
          candidateId: kanban.candidateId._id,
          action: params.activity.types.update,
          message: `${ auth.user.name } updated ${ kanban.candidateId.name }'s status to ${ status.toUpperCase() }.`
        })
      }

      return {
        data: updated
      }
    } catch(error) {
      throw new Error(params.common.message.error.server)
    }
  }

  throw new Error(params.user.message.error.auth)
}

// Delete
export async function kanbanRemove({ params: { id }, auth }) {
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
      const data = await Kanban.remove({
        _id: _id,
        userId: auth.user._id
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
