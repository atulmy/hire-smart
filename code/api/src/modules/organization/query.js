// App Imports
import Organization from './model'

// Get by ID
export async function organization({ params: { id }, auth }) {
  if(auth.user && auth.user.id) {
    const organization = await Organization.findOne({ _id: id })

    return {
      data: organization
    }
  }

  throw new Error('You are not allowed to perform this action.')
}

// Get by user
export async function organizationByUser({ auth }) {
  if(auth.user && auth.user.id) {
    const organization = await Organization.findOne({ _id: auth.user.organizationId })

    return {
      data: organization
    }
  }

  throw new Error('You are not allowed to perform this action.')
}

// Get all
export async function organizationsByUser({ auth }) {
  if(auth.user && auth.user.id) {
    const organizations = await Organization.find()

    return {
      data: organizations
    }
  }

  throw new Error('You are not allowed to perform this action.')
}
