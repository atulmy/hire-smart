// App Imports
import Project from '../model'

// Get project by ID
export async function get(parentValue, { id }) {
  return await Project.findOne({ _id: id })
}

// Get by organization
export async function getByOrganization(parentValue, {}, { auth }) {
  if(auth.user && auth.user.id) {
    return await Project.find({
      organizationId: auth.user.organizationId
    })
  }

  throw new Error('Please login to view your projects.')
}

// Get all
export async function getAll() {
  return await Project.find()
}
