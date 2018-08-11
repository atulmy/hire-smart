// Imports
import isEmpty from 'lodash/isEmpty'

// App Imports
import params from '../../../setup/config/params'
import Activity from '../../activity/model'
import Project from '../model'

// Create
export async function create(parentValue, { name, description = '' }, { auth }) {
  if(auth.user && auth.user.id) {
    const project = await Project.create({
      organizationId: auth.user.organizationId,
      userId: auth.user.id,
      name,
      description
    })

    // Log activity
    if(project) {
      await Activity.create({
        organizationId: auth.user.organizationId,
        userId: auth.user.id,
        projectId: project._id,
        action: params.activity.types.create,
        message: `${ auth.user.name } created ${ name } project.`
      })
    }

    return project
  }

  throw new Error('You are not allowed to perform this action.')
}

// Update
export async function update(parentValue, { id, name, description }, { auth }) {
  if(auth.user && auth.user.id && !isEmpty(id)) {
    return await Project.updateOne(
      { _id: id },
      {
        $set: {
          name,
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
    return await Project.remove({
      _id: _id,
      userId: auth.user.id
    })
  }

  throw new Error('You are not allowed to perform this action.')
}
