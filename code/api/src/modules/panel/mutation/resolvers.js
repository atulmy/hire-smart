// Imports
import isEmpty from 'validator/lib/isEmpty'

// App Imports
import Panel from '../model'

// Create
export async function create(parentValue, { clientId, name, email, mobile }, { auth }) {
  if(auth.user && auth.user.id) {
    return await Panel.create({
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
    return await Panel.updateOne(
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
    return await Panel.remove({
      _id: _id,
      userId: auth.user.id
    })
  } else {
    throw new Error('Please login to delete panel.')
  }
}
