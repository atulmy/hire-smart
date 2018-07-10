// App Imports
import Kanban from '../model'

// Get interviewer by ID
export async function get(parentValue, { id }, { auth }) {
  if(auth.user && auth.user.id) {
    return await Kanban.findOne({
      _id: id,
      organizationId: auth.user.organizationId
    })
      .populate({
        path: 'candidateId',
        populate: [{ path: 'clientId' }, { path: 'jobId' }]
      })
      .populate({
        path: 'interviews',
        populate: [{ path: 'interviewerId' }, { path: 'feedbackId' }]
      })
  } else {
    throw new Error('Please login to view your interviewers.')
  }
}

// Get by client
export async function getByClient(parentValue, { clientId }, { auth }) {
  if(auth.user && auth.user.id) {
    return await Kanban.find({
      organizationId: auth.user.organizationId,
      clientId
    })
      .populate({
        path: 'candidateId',
        populate: { path: 'jobId' }
      })
      .populate({
        path: 'interviews',
        populate: { path: 'interviewerId' }
      })
  } else {
    throw new Error('Please login to view your interviewers.')
  }
}

// Get all
export async function getAll() {
  return await Kanban.find()
}
