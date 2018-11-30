// App Imports
import Project from './model'

// Get project by ID
export async function project({ params: { id }}) {
  const data = await Project.findOne({ _id: id })

  return {
    data
  }
}

// Get by organization
export async function projectsByOrganization({ auth }) {
  if(auth.user && auth.user.id) {
    const data = await Project.find({
      organizationId: auth.user.organizationId
    })

    return {
      data
    }
  }

  throw new Error('You are not allowed to perform this action.')
}

// Get all
export async function projects({ auth }) {
  if(auth.user && auth.user.id) {
    const data = await Project.find()

    return {
      data
    }
  }

  throw new Error('You are not allowed to perform this action.')
}
