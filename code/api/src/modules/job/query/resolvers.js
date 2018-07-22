// App Imports
import Job from '../model'

// Get job by ID
export async function get(parentValue, { id }) {
  return await Job.findOne({ _id: id })
}

// Get by project
export async function getByProject(parentValue, { projectId }, { auth }) {
  if(auth.user && auth.user.id) {
    return await Job.find({
      organizationId: auth.user.organizationId,
      projectId
    })
  }

  throw new Error('Please login to view your jobs.')
}

// Get all
export async function getAll() {
  return await Job.find()
}
