// Imports
import isEmpty from 'lodash/isEmpty'

// App Imports
import params from '../../setup/config/params'
import { authCheck } from '../../setup/helpers/utils'
import Activity from '../activity/model'
import Project from './model'

// Create
export async function projectCreate({ params: { name, description = '' }, auth }) {
  if(authCheck(auth)) {
    const project = await Project.create({
      organizationId: auth.user.organizationId,
      userId: auth.user._id,
      name,
      description
    })

    // Log activity
    if(project) {
      await Activity.create({
        organizationId: auth.user.organizationId,
        userId: auth.user._id,
        projectId: project._id,
        action: params.activity.types.create,
        message: `${ auth.user.name } created ${ name } project.`
      })
    }

    return {
      data: project
    }
  }

  throw new Error('You are not allowed to perform this action.')
}

// Update
export async function projectUpdate({ params: { id, name, description }, auth }) {
  if(authCheck(auth) && !isEmpty(id)) {
    const data = await Project.updateOne(
      { _id: id },
      {
        $set: {
          name,
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
export async function projectRemove({ params: { id }, auth }) {
  if(authCheck(auth)) {
    const data = await Project.remove({
      _id: _id,
      userId: auth.user._id
    })

    return {
      data
    }
  }

  throw new Error('You are not allowed to perform this action.')
}
