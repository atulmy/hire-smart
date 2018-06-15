// Imports
import isEmpty from 'validator/lib/isEmpty'

// App Imports
import Job from '../model'

// Create
export async function create(parentValue, { clientId, role, description = '' }, { auth }) {
  if(auth.user && auth.user.id) {
    return await Job.create({
      organizationId: auth.user.organizationId,
      clientId,
      userId: auth.user.id,
      role,
      description
    })
  } else {
    throw new Error('Please login to create job.')
  }
}

// Update
export async function update(parentValue, { id, clientId, role, description = '' }, { auth }) {
  if(auth.user && auth.user.id && !isEmpty(id)) {
    return await Job.updateOne(
      { _id: id },
      {
        $set: {
          clientId,
          role,
          description
        }
      }
    )
  } else {
    throw new Error('Please login to update job.')
  }
}

// Delete
export async function remove(parentValue, { id }, { auth }) {
  if(auth.user && auth.user.id) {
    return await Job.remove({
      _id: _id,
      userId: auth.user.id
    })
  } else {
    throw new Error('Please login to delete job.')
  }
}
