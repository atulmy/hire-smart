// App Imports
import Organization from '../model'

// Get by ID
export async function get(parentValue, { id }, { auth }) {
  if(auth.user && auth.user.id) {
    return await Organization.findOne({ _id: id })
  }

  throw new Error('You are not allowed to perform this action.')
}

// Get by user
export async function getByUser(parentValue, {}, { auth }) {
  if(auth.user && auth.user.id) {
    return await Organization.findOne({ _id: auth.user.organizationId })
  }

  throw new Error('You are not allowed to perform this action.')
}

// Get all
export async function getAll(parentValue, {}, { auth }) {
  if(auth.user && auth.user.id) {
    return await Organization.find()
  }

  throw new Error('You are not allowed to perform this action.')
}
