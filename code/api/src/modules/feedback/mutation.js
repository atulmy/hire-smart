// Imports
import React from 'react'

// App Imports
import params from '../../setup/config/params'
import validate from '../../setup/helpers/validation'
import Activity from '../activity/model'
import Interview from '../interview/model'
import Kanban from '../kanban/model'
import Feedback from './model'

// Email
import { send as sendEmail } from '../email/send'
import FeedbackTemplate from './email/Feedback'

// Create
export async function feedbackCreateOrUpdate({ params: { interviewId, text, status } }) {
  // Validation rules
  const rules = [
    {
      data: { value: interviewId },
      check: 'notEmpty',
      message: params.common.message.error.invalidData
    },
    {
      data: { value: text },
      check: 'notEmpty',
      message: params.common.message.error.invalidData
    },
    {
      data: { value: status },
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
    const interview = await Interview.findOne({ _id: interviewId })
      .populate('candidateId')
      .populate('interviewerId')
      .populate('userId')

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
      await sendEmail({
        to: {
          name: interview.userId.name,
          email: interview.userId.email
        },
        from: {
          name: interview.interviewerId.name,
          email: interview.interviewerId.email
        },
        subject: `Feedback Received for ${ interview.candidateId.name }`,
        template:
          <FeedbackTemplate
            interview={interview}
            text={text}
            status={status}
          />
      })

      return {
        data: feedback
      }
    }
  } catch(error) {
    throw new Error(params.common.message.error.server)
  }

  throw new Error(params.common.message.error.default)
}
