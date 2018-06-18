// Imports
import React from 'react'
import moment from 'moment'
import isEmpty from 'validator/lib/isEmpty'

// App Imports
import params from '../../../setup/config/params'
import Kanban from '../../kanban/model'
import Interview from '../model'
import { send as sendEmail } from '../../email/send'
import ReminderCandidate from '../../candidate/email/Reminder'
import ReminderInterviewer from '../../interviewer/email/Reminder'

// Create
export async function create(parentValue, { clientId, candidateId, interviewerId, dateTime, mode, note = '' }, { auth }) {
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

    // Add to kanban
    const kanban = await Kanban.findOne({
      organizationId: auth.user.organizationId,
      clientId: clientId,
      candidateId: candidateId
    })
    if(kanban) {
      // Update kanban
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
        status: params.kanban.columns[0].key,
        highlight: false
      })
    }

    return interview
  } else {
    throw new Error('Please login to create interview.')
  }
}

// Update
export async function update(parentValue, { id, clientId, candidateId, interviewerId, dateTime, mode, note = '' }, { auth }) {
  if(auth.user && auth.user.id && !isEmpty(id)) {
    return await Interview.updateOne(
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


    const date = moment(interview.dateTime).format(`${ params.date.format.nice.date }, ${ params.date.format.nice.time }`)
    const subject = `${ interview.organizationId.name } Interview - ${ date }`

    // Send emails

    // 1. To Candidate
    sendEmail({
      to: {
        name: interview.candidateId.name,
        email: interview.candidateId.email,
      },
      from: auth.user,
      subject,
      template:
        <ReminderCandidate
          candidateName={interview.candidateId.name}
          date={date}
          organizationName={interview.organizationId.name}
          mode={params.interview.modes.filter(item => item.key === interview.mode)[0].name}
          note={interview.note}
          userName={interview.organizationId.name}
        />,
      organizationId: auth.user.organizationId,
      userId: auth.user.id
    })

    // 2. To Interviewer
    sendEmail({
      to: {
        name: interview.candidateId.name,
        email: interview.candidateId.email,
      },
      from: auth.user,
      subject,
      template:
        <ReminderInterviewer
          interviewerName={interview.interviewerId.name}
          candidateName={interview.candidateId.name}
          date={date}
          organizationName={interview.organizationId.name}
          mode={params.interview.modes.filter(item => item.key === interview.mode)[0].name}
          note={interview.note}
          userName={interview.organizationId.name}
        />,
      organizationId: auth.user.organizationId,
      userId: auth.user.id
    })

    return interview
  } else {
    throw new Error('Please login to send interview reminders.')
  }
}
