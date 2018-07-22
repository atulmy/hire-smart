// Imports
import React from 'react'
import isEmpty from 'validator/lib/isEmpty'

// App Imports
import params from '../../../setup/config/params'
import Activity from '../../activity/model'
import Interview from '../../interview/model'
import Kanban from '../../kanban/model'
import Feedback from '../model'
import { send as sendEmail } from '../../email/send'
import FeedbackTemplate from '../email/Feedback'

// Create
export async function createOrUpdate(parentValue, { interviewId, text, status }) {
  const interview = await Interview.findOne({ _id: interviewId })
    .populate('candidateId')
    .populate('interviewerId')
    .populate('userId')

  if(!isEmpty(interviewId) && !isEmpty(text) && !isEmpty(status)) {
    if (interview) {
      let feedback = await Feedback.findOne({ interviewId })

      // Update kanban status
      await Kanban.updateOne(
        {
          organizationId: interview.organizationId,
          projectId: interview.projectId,
          candidateId: interview.candidateId
        },
        {
          $set: {
            status
          }
        }
      )

      // Update or create feedback
      if (feedback) {
        await Feedback.updateOne(
          {interviewId},
          {
            $set: {
              text,
              status
            }
          }
        )
      } else {
        feedback = await Feedback.create({
          organizationId: interview.organizationId,
          interviewId,
          text,
          status
        })

        // Log activity
        await Activity.create({
          organizationId: interview.organizationId,
          userId: interview.userId._id,
          projectId: interview.projectId,
          interviewId,
          action: params.activity.types.create,
          message: `${ interview.interviewerId.name } submitted feedback for ${ interview.candidateId.name }.`
        })
      }

      // Update feedback id in interview
      await Interview.updateOne(
        { _id: interview._id },
        {
          feedbackId: feedback._id
        }
      )

      // Send email
      sendEmail({
        to: {
          name: interview.userId.name,
          email: interview.userId.email
        },
        from: {
          name: params.site.emails.help.name,
          email: params.site.emails.help.email
        },
        subject: `Feedback Received for ${ interview.candidateId.name }`,
        template:
          <FeedbackTemplate
            interview={interview}
            text={text}
            status={status}
          />
      })

      return feedback
    } else {
      throw new Error('Please provide all the required information.')
    }
  }

  throw new Error('Sorry, please try again.')
}
