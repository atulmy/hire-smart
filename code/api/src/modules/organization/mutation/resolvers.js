// App Imports
import Organization from '../model'

// Create
export async function create(parentValue, { name, description, domain }, { auth }) {
  if(auth.user && auth.user.id) {
    return await Organization.create({
      userId: auth.user.id,
      name,
      description,
      domain
    })
  }

  throw new Error('You are not allowed to perform this action.')
}

// Update product
export async function update(parentValue, { id, name, description, domain }, { auth }) {
  if(auth.user && auth.user.id) {
    return await Organization.updateOne(
      { _id: auth.user.organizationId },
      {
        $set: { name, description, domain }
      }
    )
  }

  throw new Error('You are not allowed to perform this action.')
}

// Delete
export async function remove(parentValue, { id }, { auth }) {
  if(auth.user && auth.user.id) {
    return await Organization.remove({
      _id: _id,
      userId: auth.user.id
    })
  }

  throw new Error('You are not allowed to perform this action.')
}
