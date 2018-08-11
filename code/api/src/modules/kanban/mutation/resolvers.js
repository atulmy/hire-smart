// Imports
import isEmpty from 'validator/lib/isEmpty'

// App Imports
import params from '../../../setup/config/params'
import Activity from '../../activity/model'
import Kanban from '../model'

// Create
export async function create(parentValue, { projectId, candidateId, interviews, status, highlight }, { auth }) {
  if(auth.user && auth.user.id) {
    return await Kanban.create({
      organizationId: auth.user.organizationId,
      userId: auth.user.id,
      projectId,
      candidateId,
      interviews,
      status,
      highlight
    })
  }

  throw new Error('You are not allowed to perform this action.')
}

// Update
export async function update(parentValue, { id, interviews, status, highlight }, { auth }) {
  if(auth.user && auth.user.id && !isEmpty(id)) {
    return await Kanban.updateOne(
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
  }

  throw new Error('You are not allowed to perform this action.')
}

// Update status
export async function updateStatus(parentValue, { id, status }, { auth }) {
  if(auth.user && auth.user.id && !isEmpty(id)) {
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
        userId: auth.user.id,
        projectId: kanban.projectId,
        candidateId: kanban.candidateId._id,
        action: params.activity.types.update,
        message: `${ auth.user.name } updated ${ kanban.candidateId.name }'s status to ${ status.toUpperCase() }.`
      })
    }

    return updated
  }

  throw new Error('You are not allowed to perform this action.')
}

// Delete
export async function remove(parentValue, { id }, { auth }) {
  if(auth.user && auth.user.id) {
    return await Kanban.remove({
      _id: _id,
      userId: auth.user.id
    })
  }

  throw new Error('You are not allowed to perform this action.')
}
