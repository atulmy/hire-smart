// Imports
import isEmpty from 'validator/lib/isEmpty'

// App Imports
import params from '../../../setup/config/params'
import Activity from '../../activity/model'
import Client from '../model'

// Create
export async function create(parentValue, { name, description = '' }, { auth }) {
  if(auth.user && auth.user.id) {
    const client = await Client.create({
      organizationId: auth.user.organizationId,
      userId: auth.user.id,
      name,
      description
    })

    // Log activity
    if(client) {
      await Activity.create({
        organizationId: auth.user.organizationId,
        userId: auth.user.id,
        clientId: client._id,
        action: params.activity.types.create,
        message: `${ auth.user.name } created ${ name } client.`
      })
    }

    return client
  } else {
    throw new Error('Please login to create client.')
  }
}

// Update
export async function update(parentValue, { id, name, description }, { auth }) {
  if(auth.user && auth.user.id && !isEmpty(id)) {
    return await Client.updateOne(
      { _id: id },
      {
        $set: {
          name,
          description
        }
      }
    )
  } else {
    throw new Error('Please login to update client.')
  }
}

// Delete
export async function remove(parentValue, { id }, { auth }) {
  if(auth.user && auth.user.id) {
    return await Client.remove({
      _id: _id,
      userId: auth.user.id
    })
  } else {
    throw new Error('Please login to delete client.')
  }
}
