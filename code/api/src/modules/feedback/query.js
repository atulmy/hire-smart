// App Imports
import { authCheck } from '../../setup/helpers/utils'
import Feedback from './model'

// Get project by ID
export async function feedback({ params: { id } }) {
  const data = await Feedback.findOne({ _id: id })

  return {
    data
  }
}

// Get by organization
export async function feedbacksByInterview({ params: { interviewId }, auth }) {
  if(authCheck(auth)) {
    const data = await Feedback.find({
      interviewId
    })

    return {
      data
    }
  }

  throw new Error('You are not allowed to perform this action.')
}

