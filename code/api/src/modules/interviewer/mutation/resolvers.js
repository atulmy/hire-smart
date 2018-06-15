// Imports
import isEmpty from 'validator/lib/isEmpty'

// App Imports
import Interviewer from '../model'

// Create
export async function create(parentValue, { clientId, name, email, mobile }, { auth }) {
  if(auth.user && auth.user.id) {
    return await Interviewer.create({
      organizationId: auth.user.organizationId,
      userId: auth.user.id,
      clientId,
      name,
      email,
      mobile
    })
  } else {
    throw new Error('Please login to create interviewer.')
  }
}

// Update
export async function update(parentValue, { id, clientId, name, email, mobile }, { auth }) {
  if(auth.user && auth.user.id && !isEmpty(id)) {
    return await Interviewer.updateOne(
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
    throw new Error('Please login to update interviewer.')
  }
}

// Delete
export async function remove(parentValue, { id }, { auth }) {
  if(auth.user && auth.user.id) {
    return await Interviewer.remove({
      _id: _id,
      userId: auth.user.id
    })
  } else {
    throw new Error('Please login to delete interviewer.')
  }
}
