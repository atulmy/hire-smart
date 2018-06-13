// Imports
import isEmpty from 'validator/lib/isEmpty'

// App Imports
import Kanban from './model'

// Query

// Get panel by ID
export async function get(parentValue, { id }) {
  return await Kanban.findOne({ _id: id })
}

// Get by client
export async function getByClient(parentValue, { clientId }, { auth }) {
  if(auth.user && auth.user.id) {
    return await Kanban.find({
      organizationId: auth.user.organizationId,
      clientId
    })
      .populate('organizationId')
      .populate('clientId')
  } else {
    throw new Error('Please login to view your panels.')
  }
}

// Get all
export async function getAll() {
  return await Kanban.find()
}


// Mutations

// Create
export async function create(parentValue, { clientId, name, email, mobile }, { auth }) {
  if(auth.user && auth.user.id) {
    return await Kanban.create({
      organizationId: auth.user.organizationId,
      userId: auth.user.id,
      clientId,
      name,
      email,
      mobile
    })
  } else {
    throw new Error('Please login to create panel.')
  }
}

// Update
export async function update(parentValue, { id, clientId, name, email, mobile }, { auth }) {
  if(auth.user && auth.user.id && !isEmpty(id)) {
    return await Kanban.updateOne(
      { _id: id },
      {
        $set: {
          clientId,
          name,
          email,
          mobile
        }
      }
    )
  } else {
    throw new Error('Please login to update panel.')
  }
}

// Delete
export async function remove(parentValue, { id }, { auth }) {
  if(auth.user && auth.user.id) {
    return await Kanban.remove({
      _id: _id,
      userId: auth.user.id
    })
  } else {
    throw new Error('Please login to delete panel.')
  }
}
