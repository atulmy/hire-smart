// Imports
import isEmpty from 'validator/lib/isEmpty'

// App Imports
import Interview from '../model'

// Create
export async function create(parentValue, { clientId, candidateId, panelId, dateTime }, { auth }) {
  if(auth.user && auth.user.id) {
    return await Interview.create({
      organizationId: auth.user.organizationId,
      userId: auth.user.id,
      clientId,
      candidateId,
      panelId,
      dateTime
    })
  } else {
    throw new Error('Please login to create interview.')
  }
}

// Update
export async function update(parentValue, { id, clientId, candidateId, panelId, dateTime }, { auth }) {
  if(auth.user && auth.user.id && !isEmpty(id)) {
    return await Interview.updateOne(
      { _id: id },
      {
        $set: {
          clientId,
          candidateId,
          panelId,
          dateTime
        }
      }
    )
  } else {
    throw new Error('Please login to update interview.')
  }
}

// Delete
export async function remove(parentValue, { id }, { auth }) {
  if(auth.user && auth.user.id) {
    return await Interview.remove({
      _id: _id,
      userId: auth.user.id
    })
  } else {
    throw new Error('Please login to delete interview.')
  }
}
