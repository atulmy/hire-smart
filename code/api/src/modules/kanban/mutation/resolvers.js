// Imports
import isEmpty from 'validator/lib/isEmpty'

// App Imports
import Kanban from '../model'

// Create
export async function create(parentValue, { clientId, name, email, mobile }, { auth }) {
  if(auth.user && auth.user.id) {
    return await Kanban.create({
      organizationId: auth.user.organizationId,
      userId: auth.user.id,
      clientId,
      name,
      email,
      mobile
    })
  } else {
    throw new Error('Please login to create panel.')
  }
}

// Update
export async function update(parentValue, { id, clientId, name, email, mobile }, { auth }) {
  if(auth.user && auth.user.id && !isEmpty(id)) {
    return await Kanban.updateOne(
      { _id: id },
      {
        $set: {
          clientId,
          name,
          email,
          mobile
        }
      }
    )
  } else {
    throw new Error('Please login to update panel.')
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
    throw new Error('Please login to delete panel.')
  }
}
