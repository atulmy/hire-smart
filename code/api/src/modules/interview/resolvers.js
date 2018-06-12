// Imports
import isEmpty from 'validator/lib/isEmpty'

// App Imports
import Interview from './model'

// Query

// Get interview by ID
export async function get(parentValue, { id }) {
  return await Interview.findOne({ _id: id })
}

// Get by user
export async function getByUser(parentValue, {}, { auth }) {
  if(auth.user && auth.user.id) {
    return await Interview.find({ userId: auth.user.id })
  } else {
    throw new Error('Please login to view interviews.')
  }
}

// Get by organization
export async function getByOrganization(parentValue, {}, { auth }) {
  if(auth.user && auth.user.id) {
    return await Interview.find({
      organizationId: auth.user.organizationId
    })
  } else {
    throw new Error('Please login to view interviews.')
  }
}

// Get by client
export async function getByClient(parentValue, { clientId }, { auth }) {
  if(auth.user && auth.user.id) {
    return await Interview.find({
      organizationId: auth.user.organizationId,
      clientId
    })
      .populate('organizationId')
      .populate('clientId')
      .populate('candidateId')
      .populate('panelId')
      .populate('userId')
  } else {
    throw new Error('Please login to view interviews.')
  }
}

// Get all
export async function getAll() {
  return await Interview.find()
}


// Mutations

// Create
export async function create(parentValue, { clientId, candidateId, panelId, dateTime }, { auth }) {
  if(auth.user && auth.user.id) {
    return await Interview.create({
      organizationId: auth.user.organizationId,
      userId: auth.user.id,
      clientId,
      candidateId,
      panelId,
      dateTime
    })
  } else {
    throw new Error('Please login to create interview.')
  }
}

// Update
export async function update(parentValue, { id, clientId, candidateId, panelId, dateTime }, { auth }) {
  if(auth.user && auth.user.id && !isEmpty(id)) {
    return await Interview.updateOne(
      { _id: id },
      {
        $set: {
          clientId,
          candidateId,
          panelId,
          dateTime
        }
      }
    )
  } else {
    throw new Error('Please login to update interview.')
  }
}

// Delete
export async function remove(parentValue, { id }, { auth }) {
  if(auth.user && auth.user.id) {
    return await Interview.remove({
      _id: _id,
      userId: auth.user.id
    })
  } else {
    throw new Error('Please login to delete interview.')
  }
}
