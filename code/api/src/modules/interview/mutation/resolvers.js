// Imports
import React from 'react'
import moment from 'moment'
import isEmpty from 'validator/lib/isEmpty'

// App Imports
import params from '../../../setup/config/params'
import Activity from '../../activity/model'
import Kanban from '../../kanban/model'
import Interview from '../model'
import { send as sendEmail } from '../../email/send'
import InterviewInviteCandidate from '../../candidate/email/InterviewInvite'
import InterviewInviteInterviewer from '../../interviewer/email/InterviewInvite'
import InterviewReminderCandidate from '../../candidate/email/InterviewReminder'
import InterviewReminderInterviewer from '../../interviewer/email/InterviewReminder'

// Create
export async function create(parentValue, { clientId, candidateId, interviewerId, dateTime, mode, note = '', invite = true }, { auth }) {
  if(auth.user && auth.user.id) {
    // Create interview
    const interview = await Interview.create({
      organizationId: auth.user.organizationId,
      userId: auth.user.id,
      clientId,
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
        clientId: clientId,
        candidateId: candidateId
      })
      if (kanban) {
        // Update kanban
        kanban.status = params.kanban.status.progress
        kanban.interviews.push(interview);
        kanban.save()
      } else {
        // Create new kanban
        await Kanban.create({
          organizationId: auth.user.organizationId,
          clientId: clientId,
          candidateId: candidateId,
          interviews: [interview._id],
          userId: auth.user.id,
          status: params.kanban.status.shortlisted,
          highlight: false
        })
      }

      // Send emails
      if (invite) {
        sentEmails(interview._id, auth, 'invite')
      }
    }

    return interview
  } else {
    throw new Error('Please login to create interview.')
  }
}

// Update
export async function update(parentValue, { id, clientId, candidateId, interviewerId, dateTime, mode, note = '', invite = true }, { auth }) {
  if(auth.user && auth.user.id && !isEmpty(id)) {
    const interview = await Interview.updateOne(
      { _id: id },
      {
        $set: {
          clientId,
          candidateId,
          interviewerId,
          dateTime,
          mode,
          note
        }
      }
    )

    // Send emails
    if(invite) {
      sentEmails(id, auth, 'update')
    }

    return interview
  } else {
    throw new Error('Please login to update interview.')
  }
}

// Delete
export async function remove(parentValue, { id }, { auth }) {
  if(auth.user && auth.user.id) {
    return await Interview.remove({
      _id: _id,
      userId: auth.user.id
    })
  } else {
    throw new Error('Please login to delete interview.')
  }
}

// Remind
export async function remind(parentValue, { id }, { auth }) {
  if(auth.user && auth.user.id) {
    const interview = await Interview.findOne({
      _id: id,
      organizationId: auth.user.organizationId
    })
      .populate('organizationId')
      .populate('candidateId')
      .populate('interviewerId')
      .populate('userId')

    // Send emails

    sentEmails(id, auth, 'remind')

    return interview
  } else {
    throw new Error('Please login to send interview reminders.')
  }
}

// Email to Candidate and Interviewer
async function sentEmails(interviewId, auth, type = 'invite') {
  const interviewDetails = await Interview.findOne({
    _id: interviewId,
    organizationId: auth.user.organizationId
  })
    .populate('organizationId')
    .populate('candidateId')
    .populate('interviewerId')
    .populate('userId')

  const date = moment(interviewDetails.dateTime).format(`${ params.date.format.nice.date }, ${ params.date.format.nice.time }`)
  const subjectAction = {
    invite: 'Invitation',
    update: 'Updated',
    remind: 'Reminder',
  }[type]
  const subject = `${ interviewDetails.organizationId.name } Interview ${ subjectAction } - ${ date }`

  // Send emails

  // 1. To Candidate

  const candidateProps = {
    candidateName: interviewDetails.candidateId.name,
    date,
    organizationName: interviewDetails.organizationId.name,
    mode: params.interview.modes.filter(item => item.key === interviewDetails.mode)[0].name,
    note: interviewDetails.note,
    userName: auth.user.name
  }

  const TemplateCandidate = {
    invite: <InterviewInviteCandidate { ...candidateProps } />,
    update: <InterviewInviteCandidate { ...candidateProps } />,
    remind: <InterviewReminderCandidate { ...candidateProps } />,
  }[type]

  sendEmail({
    to: { name: interviewDetails.candidateId.name, email: interviewDetails.candidateId.email },
    from: auth.user,
    cc: auth.user,
    subject,
    template: TemplateCandidate,
    organizationId: auth.user.organizationId,
    userId: auth.user.id
  })

  // 2. To Interviewer

  const interviewerProps = {
    interviewId,
    interviewerName: interviewDetails.interviewerId.name,
    candidateId: interviewDetails.candidateId._id,
    candidateName: interviewDetails.candidateId.name,
    date,
    organizationName: interviewDetails.organizationId.name,
    mode: params.interview.modes.filter(item => item.key === interviewDetails.mode)[0].name,
    note: interviewDetails.note,
    userName: auth.user.name
  }

  const TemplateInterviewer = {
    invite: <InterviewInviteInterviewer { ...interviewerProps } />,
    update: <InterviewInviteInterviewer { ...interviewerProps } />,
    remind: <InterviewReminderInterviewer  { ...interviewerProps } />,
  }[type]

  sendEmail({
    to: { name: interviewDetails.interviewerId.name, email: interviewDetails.interviewerId.email },
    from: auth.user,
    cc: auth.user,
    subject,
    template: TemplateInterviewer,
    organizationId: auth.user.organizationId,
    userId: auth.user.id
  })

  // Log activity
  const activityAction = {
    invite: 'scheduled an',
    update: 'updated the ',
    remind: 'sent a reminder for the'
  }[type]

  await Activity.create({
    organizationId: auth.user.organizationId,
    userId: auth.user.id,
    clientId: interviewDetails.clientId,
    interviewId: interviewDetails._id,
    action: params.activity.types.create,
    message: `${ auth.user.name } ${ activityAction } interview for ${ interviewDetails.candidateId.name } to be conducted by ${ interviewDetails.interviewerId.name } on ${ date }.`
  })
}
