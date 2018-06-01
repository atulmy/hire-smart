// Imports
import isEmpty from 'validator/lib/isEmpty'

// App Imports
import Panel from './model'

// Query

// Get panel by ID
export async function get(parentValue, { id }) {
  return await Panel.findOne({ _id: id })
}

// Get by client
export async function getByClient(parentValue, { clientId }, { auth }) {
  if(auth.user && auth.user.id) {
    return await Panel.find({
      organizationId: auth.user.organizationId,
      clientId
    })
  } else {
    throw new Error('Please login to view your panels.')
  }
}

// Get by organization
export async function getByOrganization(parentValue, {}, { auth }) {
  if(auth.user && auth.user.id) {
    return await Panel.find({
      organizationId: auth.user.organizationId
    })
  } else {
    throw new Error('Please login to view your panels.')
  }
}

// Get by user
export async function getByUser(parentValue, {}, { auth }) {
  if(auth.user && auth.user.id) {
    return await Panel.find({ userId: auth.user.id })
  } else {
    throw new Error('Please login to view your panels.')
  }
}

// Get all
export async function getAll() {
  return await Panel.find()
}


// Mutations

// Create
export async function create(parentValue, { name, email, mobile }, { auth }) {
  if(auth.user && auth.user.id) {
    return await Panel.create({
      organizationId: auth.user.organizationId,
      userId: auth.user.id,
      name,
      email,
      mobile
    })
  } else {
    throw new Error('Please login to create panel.')
  }
}

// Update
export async function update(parentValue, { id, name, email, mobile }, { auth }) {
  if(auth.user && auth.user.id && !isEmpty(id)) {
    return await Panel.updateOne(
      { _id: id },
      {
        $set: {
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
    return await Panel.remove({
      _id: _id,
      userId: auth.user.id
    })
  } else {
    throw new Error('Please login to delete panel.')
  }
}
