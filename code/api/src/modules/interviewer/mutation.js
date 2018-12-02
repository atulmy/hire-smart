// Imports
import isEmpty from 'lodash/isEmpty'

// App Imports
import params from '../../setup/config/params'
import { authCheck } from '../../setup/helpers/utils'
import Activity from '../activity/model'
import Interviewer from './model'

// Create
export async function interviewerCreate({ params: { projectId, name, email, mobile }, auth }) {
  if(authCheck(auth)) {
    const interviewer = await Interviewer.create({
      organizationId: auth.user.organizationId,
      userId: auth.user._id,
      projectId,
      name,
      email,
      mobile
    })

    if(interviewer) {
      // Log activity
      await Activity.create({
        organizationId: auth.user.organizationId,
        userId: auth.user._id,
        projectId,
        interviewerId: interviewer._id,
        action: params.activity.types.create,
        message: `${ auth.user.name } added a new interviewer ${ name } (${ email }).`
      })
    }

    return {
      data: interviewer
    }
  }

  throw new Error('You are not allowed to perform this action.')
}

// Update
export async function interviewerUpdate({ params: { id, projectId, name, email, mobile }, auth }) {
  if(authCheck(auth) && !isEmpty(id)) {
    const data = await Interviewer.updateOne(
      { _id: id },
      {
        $set: {
          projectId,
          name,
          email,
          mobile
        }
      }
    )

    return {
      data
    }
  }

  throw new Error('You are not allowed to perform this action.')
}

// Delete
export async function interviewerRemove({ params: { id }, auth }) {
  if(authCheck(auth)) {
    const data = await Interviewer.remove({
      _id: _id,
      userId: auth.user._id
    })

    return {
      data
    }
  }

  throw new Error('You are not allowed to perform this action.')
}
