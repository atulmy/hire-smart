// Imports
import isEmpty from 'validator/lib/isEmpty'

// App Imports
import params from '../../../setup/config/params'
import Kanban from '../../kanban/model'
import Interview from '../model'

// Create
export async function create(parentValue, { clientId, candidateId, interviewerId, dateTime }, { auth }) {
  if(auth.user && auth.user.id) {
    // Create interview
    const interview = await Interview.create({
      organizationId: auth.user.organizationId,
      userId: auth.user.id,
      clientId,
      candidateId,
      interviewerId,
      dateTime
    })

    // Add to kanban
    const kanban = await Kanban.findOne({
      organizationId: auth.user.organizationId,
      clientId: clientId,
      candidateId: candidateId
    })
    if(kanban) {
      // Update kanban
      kanban.interviews.push(interview);
      kanban.save()
    } else {
      // Create new kanban
      await Kanban.create({
        organizationId: auth.user.organizationId,
        clientId: clientId,
        candidateId: candidateId,
        interviews: [interview._id],
        userId: auth.user.id,
        status: params.kanban.columns[0].key,
        highlight: false
      })
    }

    return interview
  } else {
    throw new Error('Please login to create interview.')
  }
}

// Update
export async function update(parentValue, { id, clientId, candidateId, interviewerId, dateTime }, { auth }) {
  if(auth.user && auth.user.id && !isEmpty(id)) {
    return await Interview.updateOne(
      { _id: id },
      {
        $set: {
          clientId,
          candidateId,
          interviewerId,
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
