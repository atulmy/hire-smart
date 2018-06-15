// Imports
import isEmpty from 'validator/lib/isEmpty'

// App Imports
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
    return await Kanban.updateOne(
      { _id: id },
      {
        $set: {
          status
        }
      }
    )
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
