// App Imports
import params from '../../setup/config/params'
import { authCheck } from '../../setup/helpers/utils'
import validate from '../../setup/helpers/validation'
import Activity from '../activity/model'
import Interviewer from './model'

// Create
export async function interviewerCreate({ params: { projectId, name, email, mobile }, auth }) {
  if(authCheck(auth)) {
    // Validation rules
    const rules = [
      {
        data: { value: projectId },
        check: 'notEmpty',
        message: params.common.message.error.invalidData
      },
      {
        data: { value: name },
        check: 'notEmpty',
        message: 'Please enter valid name.'
      },
      {
        data: { value: email },
        check: 'email',
        message: 'Please enter valid email.'
      },
      {
        data: { value: mobile },
        check: 'notEmpty',
        message: 'Please enter valid mobile number.'
      }
    ]

    // Validate
    try {
      validate(rules)
    } catch(error) {
      throw new Error(error.message)
    }

    try {
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
    } catch(error) {
      throw new Error(params.common.message.error.server)
    }
  }

  throw new Error(params.user.message.error.auth)
}

// Update
export async function interviewerUpdate({ params: { id, projectId, name, email, mobile }, auth }) {
  if(authCheck(auth)) {
    // Validation rules
    const rules = [
      {
        data: { value: id },
        check: 'notEmpty',
        message: params.common.message.error.invalidData
      },
      {
        data: { value: projectId },
        check: 'notEmpty',
        message: params.common.message.error.invalidData
      },
      {
        data: { value: name },
        check: 'notEmpty',
        message: 'Please enter valid name.'
      },
      {
        data: { value: email },
        check: 'email',
        message: 'Please enter valid email.'
      },
      {
        data: { value: mobile },
        check: 'notEmpty',
        message: 'Please enter valid mobile number.'
      }
    ]

    // Validate
    try {
      validate(rules)
    } catch(error) {
      throw new Error(error.message)
    }

    try {
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
    } catch(error) {
      throw new Error(params.common.message.error.server)
    }
  }

  throw new Error(params.user.message.error.auth)
}

// Delete
export async function interviewerRemove({ params: { id }, auth }) {
  if(authCheck(auth)) {
    // Validation rules
    const rules = [
      {
        data: { value: id },
        check: 'notEmpty',
        message: params.common.message.error.invalidData
      }
    ]

    // Validate
    try {
      validate(rules)
    } catch(error) {
      throw new Error(error.message)
    }

    try {
      const data = await Interviewer.remove({
        _id: id,
        userId: auth.user._id
      })

      return {
        data
      }
    } catch(error) {
      throw new Error(params.common.message.error.server)
    }
  }

  throw new Error(params.user.message.error.auth)
}
