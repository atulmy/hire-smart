// App Imports
import { authCheck } from '../../setup/helpers/utils'
import Job from './model'

// Get job by ID
export async function job({ params: { id } }) {
  if(authCheck(auth)) {
    const data = await Job.findOne({ _id: id })

    return {
      data
    }
  }

  throw new Error('You are not allowed to perform this action.')
}

// Get by project
export async function jobsByProject({ params: { projectId }, auth }) {
  if(authCheck(auth)) {
    const data = await Job.find({
      organizationId: auth.user.organizationId,
      projectId
    })

    return {
      data
    }
  }

  throw new Error('You are not allowed to perform this action.')
}

// Get all
export async function jobs() {
  if(authCheck(auth)) {
    const data = await Job.find()

    return {
      data
    }
  }

  throw new Error('You are not allowed to perform this action.')
}
