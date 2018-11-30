// Imports
import isEmpty from 'lodash/isEmpty'

// App Imports
import params from '../../setup/config/params'
import { authCheck } from '../../setup/helpers/utils'
import Activity from '../activity/model'
import Job from './model'

// Create
export async function jobCreate({ params: { projectId, role, description = '' }, auth }) {
  if(authCheck(auth)) {
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

    return {
      data: job
    }
  }

  throw new Error('You are not allowed to perform this action.')
}

// Update
export async function jobUpdate({ params: { id, projectId, role, description = '' }, auth }) {
  if(authCheck(auth) && !isEmpty(id)) {
    const data = await Job.updateOne(
      { _id: id },
      {
        $set: {
          projectId,
          role,
          description
        }
      }
    )

    return {
      data
    }
  }

  throw new Error('You are not allowed to perform this action.')
}

// Delete
export async function jobRemove(parentValue, { id }, { auth }) {
  if(authCheck(auth)) {
    const data = await Job.remove({
      _id: _id,
      userId: auth.user.id
    })

    return {
      data
    }
  }

  throw new Error('You are not allowed to perform this action.')
}
