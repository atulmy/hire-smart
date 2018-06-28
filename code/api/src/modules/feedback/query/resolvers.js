// App Imports
import Feedback from '../model'

// Get client by ID
export async function get(parentValue, { id }) {
  return await Feedback.findOne({ _id: id })
}

// Get by organization
export async function getByInterview(parentValue, { interviewId }, { auth }) {
  if(auth.user && auth.user.id) {
    return await Feedback.find({
      interviewId
    })
  } else {
    throw new Error('Please login to view feedbacks.')
  }
}

