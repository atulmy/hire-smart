// Imports
import isEmpty from 'lodash/isEmpty'

// App Imports
import params from '../../../setup/config/params'
import Activity from '../../activity/model'
import Job from '../model'

// Create
export async function create(parentValue, { projectId, role, description = '' }, { auth }) {
  if(auth.user && auth.user.id) {
    const job = await Job.create({
      organizationId: auth.user.organizationId,
      projectId,
      userId: auth.user.id,
      role,
      description
    })

    if(job) {
      // Log activity
      await Activity.create({
        organizationId: auth.user.organizationId,
        userId: auth.user.id,
        projectId,
        jobId: job._id,
        action: params.activity.types.create,
        message: `${ auth.user.name } added a new job ${ role }.`
      })
    }

    return job
  }

  throw new Error('You are not allowed to perform this action.')
}

// Update
export async function update(parentValue, { id, projectId, role, description = '' }, { auth }) {
  if(auth.user && auth.user.id && !isEmpty(id)) {
    return await Job.updateOne(
      { _id: id },
      {
        $set: {
          projectId,
          role,
          description
        }
      }
    )
  }

  throw new Error('You are not allowed to perform this action.')
}

// Delete
export async function remove(parentValue, { id }, { auth }) {
  if(auth.user && auth.user.id) {
    return await Job.remove({
      _id: _id,
      userId: auth.user.id
    })
  }

  throw new Error('You are not allowed to perform this action.')
}
