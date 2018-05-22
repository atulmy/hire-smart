// App Imports
import Client from './model'

// Get client by ID
export async function get(parentValue, { id }) {
  return await Client.findOne({ _id: id })
}

// Get by client
export async function getByOrganization(parentValue, { organizationId }) {
  return await Client.find({ organizationId })
}

// Get by user
export async function getByUser(parentValue, {}, { auth }) {
  if(auth.user && auth.user.id > 0) {
    return await Client.find({ userId: auth.user.id })
  } else {
    throw new Error('Please login to view your organizations.')
  }
}

// Get all
export async function getAll() {
  return await Client.find()
}

// Create
export async function create(parentValue, { name, description, domain }, { auth }) {
  if(auth.user && auth.user.id > 0) {
    return await Client.create({
      userId: auth.user.id,
      name,
      description,
      domain
    })
  } else {
    throw new Error('Please login to create organization.')
  }
}

// Delete
export async function remove(parentValue, { id }, { auth }) {
  if(auth.user && auth.user.id > 0) {
    return await Client.remove({
      _id: _id,
      userId: auth.user.id
    })
  } else {
    throw new Error('Access denied.')
  }
}
