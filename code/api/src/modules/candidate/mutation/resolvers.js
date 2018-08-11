// Imports
import isEmpty from 'lodash/isEmpty'

// App Imports
import params from '../../../setup/config/params'
import Kanban from '../../kanban/model'
import Candidate from '../model'
import Activity from '../../activity/model'

// Create
export async function create(parentValue, { projectId, jobId = '', name, email, mobile, experience, resume, salaryCurrent = '', salaryExpected = '' }, { auth }) {
  if(auth.user && auth.user.id) {
    let item = {
      organizationId: auth.user.organizationId,
      projectId,
      userId: auth.user.id,
      name,
      email,
      mobile,
      experience,
      resume,
      salaryCurrent,
      salaryExpected
    }
    if(!isEmpty(jobId)) {
      item.jobId = jobId
    }

    const candidate = await Candidate.create(item)

    if(candidate) {
      const kanban = await Kanban.create({
        organizationId: auth.user.organizationId,
        projectId,
        candidateId: candidate._id,
        userId: auth.user.id,
        status: params.kanban.columns[0].key,
        highlight: false
      })

      // Log activity
      await Activity.create({
        organizationId: auth.user.organizationId,
        userId: auth.user.id,
        projectId,
        candidateId: candidate._id,
        kanbanId: kanban._id,
        action: params.activity.types.create,
        message: `${ auth.user.name } added a new candidate ${ name } (${ email }).`
      })
    }

    return candidate
  }

  throw new Error('You are not allowed to perform this action.')
}

// Update
export async function update(parentValue, { id, projectId, jobId = '', name, email, mobile, experience, resume, salaryCurrent = '', salaryExpected = '' }, { auth }) {
  if(auth.user && auth.user.id && !isEmpty(id)) {
    let item = {
      projectId,
      name,
      email,
      mobile,
      experience,
      resume,
      salaryCurrent,
      salaryExpected
    }
    if(!isEmpty(jobId)) {
      item.jobId = jobId
    }

    const candidate = await Candidate.updateOne({ _id: id }, { $set: item })

    if(candidate) {
      await Kanban.updateOne(
        {
          organizationId: auth.user.organizationId,
          candidateId: id
        },
        { projectId }
      )
    }

    return candidate
  }

  throw new Error('You are not allowed to perform this action.')
}

// Delete
export async function remove(parentValue, { id }, { auth }) {
  if(auth.user && auth.user.id) {
    return await Candidate.remove({
      _id: _id,
      userId: auth.user.id
    })
  }

  throw new Error('You are not allowed to perform this action.')
}
