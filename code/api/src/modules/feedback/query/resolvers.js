// App Imports
import Feedback from '../model'

// Get project by ID
export async function get(parentValue, { id }) {
  return await Feedback.findOne({ _id: id })
}

// Get by organization
export async function getByInterview(parentValue, { interviewId }, { auth }) {
  if(auth.user && auth.user.id) {
    return await Feedback.find({
      interviewId
    })
  }

  throw new Error('You are not allowed to perform this action.')
}

