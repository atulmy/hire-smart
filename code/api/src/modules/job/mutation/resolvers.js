// Imports
import isEmpty from 'validator/lib/isEmpty'

// App Imports
import params from '../../../setup/config/params'
import Activity from '../../activity/model'
import Job from '../model'

// Create
export async function create(parentValue, { clientId, role, description = '' }, { auth }) {
  if(auth.user && auth.user.id) {
    const job = await Job.create({
      organizationId: auth.user.organizationId,
      clientId,
      userId: auth.user.id,
      role,
      description
    })

    if(job) {
      // Log activity
      await Activity.create({
        organizationId: auth.user.organizationId,
        userId: auth.user.id,
        clientId,
        jobId: job._id,
        action: params.activity.types.create,
        message: `${ auth.user.name } added a new job ${ role }.`
      })
    }

    return job
  } else {
    throw new Error('Please login to create job.')
  }
}

// Update
export async function update(parentValue, { id, clientId, role, description = '' }, { auth }) {
  if(auth.user && auth.user.id && !isEmpty(id)) {
    return await Job.updateOne(
      { _id: id },
      {
        $set: {
          clientId,
          role,
          description
        }
      }
    )
  } else {
    throw new Error('Please login to update job.')
  }
}

// Delete
export async function remove(parentValue, { id }, { auth }) {
  if(auth.user && auth.user.id) {
    return await Job.remove({
      _id: _id,
      userId: auth.user.id
    })
  } else {
    throw new Error('Please login to delete job.')
  }
}
