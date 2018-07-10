// Imports
import mongoose from 'mongoose'

// App Imports
import { collection as Organization } from '../organization/model'
import { collection as Project } from '../project/model'
import { collection as Candidate } from '../candidate/model'
import { collection as Interviewer } from '../interviewer/model'
import { collection as Interview } from '../interview/model'
import { collection as User } from '../user/model'
import { collection as Invite } from '../invite/model'
import { collection as Job } from '../job/model'
import { collection as Kanban } from '../kanban/model'

// Collection name
export const collection = 'Activities'

// Schema
const Schema = new mongoose.Schema({
  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: Organization,
    index: true
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Project,
    index: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User
  },
  candidateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Candidate
  },
  interviewerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Interviewer
  },
  interviewId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Interview
  },
  inviteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Invite
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Job
  },
  kanbanId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Kanban
  },
  action: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  }
}, {timestamps: true})

// Model
export default mongoose.model(collection, Schema, collection)
