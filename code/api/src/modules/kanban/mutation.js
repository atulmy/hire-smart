// Imports
import isEmpty from 'lodash/isEmpty'

// App Imports
import params from '../../setup/config/params'
import { authCheck } from '../../setup/helpers/utils'
import Activity from '../activity/model'
import Kanban from './model'

// Create
export async function kanbanCreate({ params: { projectId, candidateId, interviews, status, highlight }, auth }) {
  if(authCheck(auth)) {
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
  }

  throw new Error('You are not allowed to perform this action.')
}

// Update
export async function kanbanUpdate({ params: { id, interviews, status, highlight }, auth }) {
  if(authCheck(auth) && !isEmpty(id)) {
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
  }

  throw new Error('You are not allowed to perform this action.')
}

// Update status
export async function kanbanUpdateStatus({ params: { id, status }, auth }) {
  if(authCheck(auth) && !isEmpty(id)) {
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
  }

  throw new Error('You are not allowed to perform this action.')
}

// Delete
export async function kanbanRemove({ params: { id }, auth }) {
  if(authCheck(auth)) {
    const data = await Kanban.remove({
      _id: _id,
      userId: auth.user._id
    })

    return {
      data
    }
  }

  throw new Error('You are not allowed to perform this action.')
}
