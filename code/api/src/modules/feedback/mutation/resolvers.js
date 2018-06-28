// Imports
import isEmpty from 'validator/lib/isEmpty'

// App Imports
import Interview from '../../interview/model'
import Kanban from '../../kanban/model'
import Feedback from '../model'

// Create
export async function createOrUpdate(parentValue, { interviewId, text, status }) {
  const interview = await Interview.findOne({ _id: interviewId })

  if(!isEmpty(interviewId) && !isEmpty(text) && !isEmpty(status)) {
    if (interview) {
      const feedback = Feedback.findOne({ interviewId })

      const kanban = await Kanban.updateOne(
        {
          organizationId: interview.organizationId,
          clientId: interview.clientId,
          candidateId: interview.candidateId
        },
        {
          $set: {
            status
          }
        }
      )
      console.log(kanban)

      if (feedback) {
        return await Feedback.updateOne(
          {interviewId},
          {
            $set: {
              text,
              status
            }
          }
        )
      } else {
        return await Feedback.create({
          organizationId: interview.organizationId,
          interviewId,
          text,
          status
        })
      }
    } else {
      throw new Error('Please provide all the required information.')
    }
  }
}
