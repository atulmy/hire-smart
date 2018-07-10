// Imports
import mongoose from 'mongoose'

// App Imports
import { collection as Organization } from '../organization/model'
import { collection as Project } from '../project/model'
import { collection as Candidate } from '../candidate/model'
import { collection as Interviewer } from '../interviewer/model'
import { collection as Feedback } from '../feedback/model'
import { collection as User } from '../user/model'

// Collection name
export const collection = 'Interview'

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
    required: true,
    ref: Project,
    index: true
  },
  candidateId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: Candidate
  },
  interviewerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: Interviewer
  },
  feedbackId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Feedback
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: User
  },
  dateTime: {
    type: String,
    default: new Date()
  },
  mode: {
    type: String,
    required: true
  },
  note: {
    type: String
  }
}, {timestamps: true})

// Model
export default mongoose.model(collection, Schema, collection)
