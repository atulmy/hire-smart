// App Imports
import Organization from './model'

// Get subscription by ID
export async function get(parentValue, { id }) {
  return await Organization.findOne({ _id: id })
}

// Get by user
export async function getByUser(parentValue, {}, { auth }) {
  if(auth.user && auth.user.id) {
    return await Organization.findOne({ userId: auth.user.id })
  } else {
    throw new Error('Please login to view your organizations.')
  }
}

// Get all
export async function getAll() {
  return await Organization.find()
}

// Create
export async function create(parentValue, { name, description, domain }, { auth }) {
  if(auth.user && auth.user.id) {
    return await Organization.create({
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
  if(auth.user && auth.user.id) {
    return await Organization.remove({
      _id: _id,
      userId: auth.user.id
    })
  } else {
    throw new Error('Access denied.')
  }
}
