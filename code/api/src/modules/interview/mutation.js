// Imports
import React from 'react'
import moment from 'moment'
import ical from 'ical-generator'

// App Imports
import params from '../../setup/config/params'
import { authCheck } from '../../setup/helpers/utils'
import validate from '../../setup/helpers/validation'
import Activity from '../activity/model'
import Kanban from '../kanban/model'
import Interview from './model'

// Email
import { send as sendEmail } from '../email/send'
import InterviewInviteCandidate from '../candidate/email/InterviewInvite'
import InterviewInviteInterviewer from '../interviewer/email/InterviewInvite'
import InterviewReminderCandidate from '../candidate/email/InterviewReminder'
import InterviewReminderInterviewer from '../interviewer/email/InterviewReminder'

// Create
export async function interviewCreate({ params: { projectId, candidateId, interviewerId, dateTime, mode, note = '', invite = true }, auth }) {
  if(authCheck(auth)) {
    // Validation rules
    const rules = [
      {
        data: { value: projectId },
        check: 'notEmpty',
        message: params.common.message.error.invalidData
      },
      {
        data: { value: candidateId },
        check: 'notEmpty',
        message: 'Please select a candidate.'
      },
      {
        data: { value: interviewerId },
        check: 'notEmpty',
        message: 'Please select an interviewer.'
      },
      {
        data: { value: dateTime },
        check: 'notEmpty',
        message: 'Please select valid date and time.'
      },
      {
        data: { value: mode },
        check: 'notEmpty',
        message: 'Please select valid mode.'
      }
    ]

    // Validate
    try {
      validate(rules)
    } catch(error) {
      throw new Error(error.message)
    }

    try {
      // Create interview
      const interview = await Interview.create({
        organizationId: auth.user.organizationId,
        userId: auth.user._id,
        projectId,
        candidateId,
        interviewerId,
        dateTime,
        mode,
        note
      })

      if(interview) {
        // Add to kanban
        const kanban = await Kanban.findOne({
          organizationId: auth.user.organizationId,
          projectId: projectId,
          candidateId: candidateId
        })
        if (kanban) {
          // Update kanban
          let interviews = kanban.interviews
          interviews.push(interview._id)
          await Kanban.updateOne(
            { _id: kanban._id },
            {
              status: params.kanban.status.progress,
              interviews,
            }
          )
        } else {
          // Create new kanban
          await Kanban.create({
            organizationId: auth.user.organizationId,
            projectId: projectId,
            candidateId: candidateId,
            interviews: [interview._id],
            userId: auth.user._id,
            status: params.kanban.status.shortlisted,
            highlight: false
          })
        }

        // Send emails
        sentEmails(invite, interview._id, auth, 'invite')
      }

      return {
        data: interview
      }
    } catch(error) {
      throw new Error(params.common.message.error.server)
    }
  }

  throw new Error(params.user.message.error.auth)
}

// Update
export async function interviewUpdate({ params: { id, projectId, candidateId, interviewerId, dateTime, mode, note = '', invite = true }, auth }) {
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
        data: { value: candidateId },
        check: 'notEmpty',
        message: 'Please select a candidate.'
      },
      {
        data: { value: interviewerId },
        check: 'notEmpty',
        message: 'Please select an interviewer.'
      },
      {
        data: { value: dateTime },
        check: 'notEmpty',
        message: 'Please select valid date and time.'
      },
      {
        data: { value: mode },
        check: 'notEmpty',
        message: 'Please select valid mode.'
      }
    ]

    // Validate
    try {
      validate(rules)
    } catch(error) {
      throw new Error(error.message)
    }

    try {
      const interview = await Interview.updateOne(
        { _id: id },
        {
          $set: {
            projectId,
            candidateId,
            interviewerId,
            dateTime,
            mode,
            note
          }
        }
      )

      if(interview) {
        // Add to kanban
        const kanban = await Kanban.findOne({
          organizationId: auth.user.organizationId,
          projectId: projectId,
          candidateId: candidateId
        })

        if (kanban) {
          let interviews = kanban.interviews
          if(interviews.indexOf(id) === -1) {
            interviews.push(id)
            await Kanban.updateOne(
              { _id: kanban._id },
              {
                status: params.kanban.status.progress,
                interviews
              }
            )
          }
        }
      }

      // Send emails
      await sentEmails(invite, id, auth, 'update')

      return {
        data: interview
      }
    } catch(error) {
      throw new Error(params.common.message.error.server)
    }
  }

  throw new Error(params.user.message.error.auth)
}

// Delete
export async function interviewRemove({ params: { id }, auth }) {
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
      const data = await Interview.remove({
        _id: _id,
        userId: auth.user._id
      })

      return {
        data
      }
    } catch(error) {
      throw new Error(params.common.message.error.server)
    }
  }

  throw new Error('Please login to delete interview.')
}

// Remind
export async function remind({ params: { id }, auth }) {
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
      const interview = await Interview.findOne({
        _id: id,
        organizationId: auth.user.organizationId
      })
        .populate('organizationId')
        .populate('candidateId')
        .populate('interviewerId')
        .populate('userId')

      // Send emails

      await sentEmails(true, id, auth, 'remind')

      return {
        data: interview
      }
    } catch(error) {
      throw new Error(params.common.message.error.server)
    }
  }

  throw new Error(params.user.message.error.auth)
}

// Email to Candidate and Interviewer
async function sentEmails(invite, interviewId, auth, type = 'invite') {
  const interviewDetails = await Interview.findOne({
    _id: interviewId,
    organizationId: auth.user.organizationId
  })
    .populate('organizationId')
    .populate('candidateId')
    .populate('interviewerId')
    .populate('userId')

  const date = moment(interviewDetails.dateTime).format(`${ params.date.format.nice.date }, ${ params.date.format.nice.time }`)

  if(invite) {
    const mode = params.interview.modes.filter(item => item.key === interviewDetails.mode)[0].name
    const subjectAction = {
      invite: 'Invitation',
      update: 'Updated',
      remind: 'Reminder',
    }[type]
    const subject = `${ interviewDetails.organizationId.name } Interview ${ subjectAction } - ${ date }`

    // Calendar
    const calendar = ical({
      method: 'publish',
      domain: interviewDetails.organizationId.domain,
      name: subject
    })
    const event = calendar.createEvent({
      domain: interviewDetails.organizationId.domain,
      start: moment(interviewDetails.dateTime).toDate(),
      end: moment(interviewDetails.dateTime).add(1, 'hour').toDate(),
      summary: subject,
      location: mode,
      description: interviewDetails.note
    })
    event.organizer({
      name: auth.user.name,
      email: auth.user.email,
    })

    const icalEvent = {content: calendar.toString()}

    // Send emails

    // 1. To Candidate

    const candidateProps = {
      candidateName: interviewDetails.candidateId.name,
      date,
      organizationName: interviewDetails.organizationId.name,
      mode,
      note: interviewDetails.note,
      userName: auth.user.name
    }

    const TemplateCandidate = {
      invite: <InterviewInviteCandidate {...candidateProps} />,
      update: <InterviewInviteCandidate {...candidateProps} />,
      remind: <InterviewReminderCandidate {...candidateProps} />,
    }[type]

    await sendEmail({
      to: {name: interviewDetails.candidateId.name, email: interviewDetails.candidateId.email},
      from: auth.user,
      cc: auth.user,
      subject,
      template: TemplateCandidate,
      organizationId: auth.user.organizationId,
      userId: auth.user._id,
      icalEvent
    })

    // 2. To Interviewer

    const interviewerProps = {
      interviewId,
      interviewerName: interviewDetails.interviewerId.name,
      candidateId: interviewDetails.candidateId._id,
      candidateName: interviewDetails.candidateId.name,
      date,
      organizationName: interviewDetails.organizationId.name,
      mode,
      note: interviewDetails.note,
      userName: auth.user.name
    }

    const TemplateInterviewer = {
      invite: <InterviewInviteInterviewer {...interviewerProps} />,
      update: <InterviewInviteInterviewer {...interviewerProps} />,
      remind: <InterviewReminderInterviewer  {...interviewerProps} />,
    }[type]

    await sendEmail({
      to: {name: interviewDetails.interviewerId.name, email: interviewDetails.interviewerId.email},
      from: auth.user,
      cc: auth.user,
      subject,
      template: TemplateInterviewer,
      organizationId: auth.user.organizationId,
      userId: auth.user._id,
      icalEvent
    })
  }

  // Log activity
  const activityAction = {
    invite: 'scheduled an',
    update: 'updated the ',
    remind: 'sent a reminder for the'
  }[type]

  await Activity.create({
    organizationId: auth.user.organizationId,
    userId: auth.user._id,
    projectId: interviewDetails.projectId,
    interviewId: interviewDetails._id,
    candidateId: interviewDetails.candidateId._id,
    interviewerId: interviewDetails.interviewerId._id,
    action: params.activity.types.create,
    message: `${ auth.user.name } ${ activityAction } interview for ${ interviewDetails.candidateId.name } to be conducted by ${ interviewDetails.interviewerId.name } on ${ date }.`
  })
}
