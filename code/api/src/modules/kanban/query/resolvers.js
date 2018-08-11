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
        populate: [{ path: 'projectId' }, { path: 'jobId' }]
      })
      .populate({
        path: 'interviews',
        populate: [{ path: 'interviewerId' }, { path: 'feedbackId' }]
      })
  }

  throw new Error('You are not allowed to perform this action.')
}

// Get by project
export async function getByProject(parentValue, { projectId }, { auth }) {
  if(auth.user && auth.user.id) {
    return await Kanban.find({
      organizationId: auth.user.organizationId,
      projectId
    })
      .populate({
        path: 'candidateId',
        populate: { path: 'jobId' }
      })
      .populate({
        path: 'interviews',
        populate: [{ path: 'interviewerId' }, { path: 'feedbackId' }]
      })
  }

  throw new Error('You are not allowed to perform this action.')
}

// Get all
export async function getAll(parentValue, { projectId }, { auth }) {
  if(auth.user && auth.user.id) {
    return await Kanban.find()
  }

  throw new Error('You are not allowed to perform this action.')
}
