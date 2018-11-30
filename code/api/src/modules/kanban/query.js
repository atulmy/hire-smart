// App Imports
import { authCheck } from '../../setup/helpers/utils'
import Kanban from './model'

// Get by ID
export async function kanban({ params: { id }, auth }) {
  if(authCheck(auth)) {
    const data = await Kanban.findOne({
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

    return {
      data
    }
  }

  throw new Error('You are not allowed to perform this action.')
}

// Get by project
export async function kanbansByProject({ params: { projectId }, auth }) {
  if(authCheck(auth)) {
    const data = await Kanban.find({
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

    return {
      data
    }
  }

  throw new Error('You are not allowed to perform this action.')
}

// Get all
export async function kanbans({ params: { projectId }, auth }) {
  if(authCheck(auth)) {
    const data = await Kanban.find()

    return {
      data
    }
  }

  throw new Error('You are not allowed to perform this action.')
}
