// Imports
import isEmpty from 'validator/lib/isEmpty'

// App Imports
import params from '../../../setup/config/params'
import Kanban from '../../kanban/model'
import Candidate from '../model'

// Create
export async function create(parentValue, { clientId, name, email, mobile, experience, resume, salaryCurrent = '', salaryExpected = '' }, { auth }) {
  if(auth.user && auth.user.id) {
    const candidate = await Candidate.create({
      organizationId: auth.user.organizationId,
      clientId,
      userId: auth.user.id,
      name,
      email,
      mobile,
      experience,
      resume,
      salaryCurrent,
      salaryExpected
    })

    await Kanban.create({
      clientId,
      candidateId: candidate._id,
      userId: auth.user.id,
      status: params.kanban.columns[0].key,
      highlight: false
    })

    return candidate
  } else {
    throw new Error('Please login to create candidate.')
  }
}

// Update
export async function update(parentValue, { id, clientId, name, email, mobile, experience, resume, salaryCurrent = '', salaryExpected = '' }, { auth }) {
  if(auth.user && auth.user.id && !isEmpty(id)) {
    return await Candidate.updateOne(
      { _id: id },
      {
        $set: {
          clientId,
          name,
          email,
          mobile,
          experience,
          resume,
          salaryCurrent,
          salaryExpected
        }
      }
    )
  } else {
    throw new Error('Please login to update candidate.')
  }
}

// Delete
export async function remove(parentValue, { id }, { auth }) {
  if(auth.user && auth.user.id) {
    return await Candidate.remove({
      _id: _id,
      userId: auth.user.id
    })
  } else {
    throw new Error('Please login to delete candidate.')
  }
}
