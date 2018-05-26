// App Imports
import Organization from '../organization/model'
import Client from './model'

// Query

// Get client by ID
export async function get(parentValue, { id }) {
  return await Client.findOne({ _id: id })
}

// Get by client
export async function getByOrganization(parentValue, { organizationId }) {
  return await Client.find({ organizationId })
}

// Get by user
export async function getByUser(parentValue, {}, { auth }) {
  if(auth.user && auth.user.id) {
    const organization = await Organization.findOne({ userId: auth.user.id })

    if(organization) {
      return await Client.find({ organizationId: organization._id })
    } else {
      throw new Error('Organization does not exists.')
    }
  } else {
    throw new Error('Please login to view your organization.')
  }
}

// Get all
export async function getAll() {
  return await Client.find()
}


// Mutations

// Create
export async function create(parentValue, { name, description = '' }, { auth }) {
  if(auth.user && auth.user.id) {
    const organization = await Organization.findOne({ userId: auth.user.id })

    if(organization) {
      return await Client.create({
        organizationId: organization._id,
        userId: auth.user.id,
        name,
        description
      })
    } else {
      throw new Error('Organization does not exists.')
    }
  } else {
    throw new Error('Please login to create organization.')
  }
}

// Update
export async function update(parentValue, { id, name, slug, description, type, gender, image }, { auth }) {
  if(auth.user && auth.user.role === params.user.roles.admin) {
    return await Client.update(
      {
        name,
        slug,
        description,
        type,
        gender,
        image
      },
      { where: { id } }
    )
  } else {
    throw new Error('Operation denied.')
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
    throw new Error('Access denied.')
  }
}
