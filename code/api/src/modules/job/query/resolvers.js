// App Imports
import Job from '../model'

// Get job by ID
export async function get(parentValue, { id }) {
  return await Job.findOne({ _id: id })
}

// Get by client
export async function getByClient(parentValue, { clientId }, { auth }) {
  if(auth.user && auth.user.id) {
    return await Job.find({
      organizationId: auth.user.organizationId,
      clientId
    })
  } else {
    throw new Error('Please login to view your jobs.')
  }
}

// Get all
export async function getAll() {
  return await Job.find()
}
