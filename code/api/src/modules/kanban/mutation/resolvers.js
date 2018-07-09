// Imports
import isEmpty from 'validator/lib/isEmpty'

// App Imports
import params from '../../../setup/config/params'
import Activity from '../../activity/model'
import Kanban from '../model'

// Create
export async function create(parentValue, { clientId, candidateId, interviews, status, highlight }, { auth }) {
  if(auth.user && auth.user.id) {
    return await Kanban.create({
      organizationId: auth.user.organizationId,
      userId: auth.user.id,
      clientId,
      candidateId,
      interviews,
      status,
      highlight
    })
  } else {
    throw new Error('Please login to create interviewer.')
  }
}

// Update
export async function update(parentValue, { id, interviews, status, highlight }, { auth }) {
  if(auth.user && auth.user.id && !isEmpty(id)) {
    return await Kanban.updateOne(
      { _id: id },
      {
        $set: {
          clientId,
          interviews,
          status,
          highlight
        }
      }
    )
  } else {
    throw new Error('Please login to update interviewer.')
  }
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
        clientId: kanban.clientId,
        candidateId: kanban.candidateId._id,
        action: params.activity.types.update,
        message: `${ auth.user.name } updated ${ kanban.candidateId.name }'s status to ${ status }.`
      })
    }

    return updated
  } else {
    throw new Error('Please login to update interviewer.')
  }
}

// Delete
export async function remove(parentValue, { id }, { auth }) {
  if(auth.user && auth.user.id) {
    return await Kanban.remove({
      _id: _id,
      userId: auth.user.id
    })
  } else {
    throw new Error('Please login to delete interviewer.')
  }
}
