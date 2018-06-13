// App Imports
import Client from '../model'

// Get client by ID
export async function get(parentValue, { id }) {
  return await Client.findOne({ _id: id })
}

// Get by organization
export async function getByOrganization(parentValue, {}, { auth }) {
  if(auth.user && auth.user.id) {
    return await Client.find({
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
