// App Imports
import Organization from '../model'

// Get subscription by ID
export async function get(parentValue, { id }) {
  return await Organization.findOne({ _id: id })
}

// Get by user
export async function getByUser(parentValue, {}, { auth }) {
  if(auth.user && auth.user.id) {
    return await Organization.findOne({ _id: auth.user.organizationId })
  } else {
    throw new Error('Please login to view your organization.')
  }
}

// Get all
export async function getAll() {
  return await Organization.find()
}
