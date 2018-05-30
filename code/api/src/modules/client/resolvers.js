// Imports
import isEmpty from 'validator/lib/isEmpty'

// App Imports
import Client from './model'

// Query

// Get client by ID
export async function get(parentValue, { id }) {
  return await Client.findOne({ _id: id })
}

// Get by organization
export async function getByOrganization(parentValue, {}, { auth }) {
  if(auth.user && auth.user.id) {
    return await Client.find({
      userId: auth.user.id,
      organizationId: auth.user.organizationId
    })
  } else {
    throw new Error('Please login to view your clients.')
  }
}

// Get by user
export async function getByUser(parentValue, {}, { auth }) {
  if(auth.user && auth.user.id) {
    return await Client.find({ userId: auth.user.id })
  } else {
    throw new Error('Please login to view your clients.')
  }
}

// Get all
export async function getAll() {
  return await Client.find()
}


// Mutations

// Create
export async function create(parentValue, { name, description = '' }, { auth }) {
  if(auth.user && auth.user.id) {
    return await Client.create({
      organizationId: auth.user.organizationId,
      userId: auth.user.id,
      name,
      description
    })
  } else {
    throw new Error('Please login to create client.')
  }
}

// Update
export async function update(parentValue, { id, name, description }, { auth }) {
  if(auth.user && auth.user.id && !isEmpty(id)) {
    return await Client.updateOne(
      { _id: id },
      {
        $set: {
          name,
          description
        }
      }
    )
  } else {
    throw new Error('Please login to update client.')
  }
}

// Delete
export async function remove(parentValue, { id }, { auth }) {
  if(auth.user && auth.user.id) {
    return await Client.remove({
      _id: _id,
      userId: auth.user.id
    })
  } else {
    throw new Error('Please login to delete client.')
  }
}
