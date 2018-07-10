// Imports
import mongoose from 'mongoose'

// App Imports
import { collection as Organization } from '../organization/model'
import { collection as Project } from '../project/model'
import { collection as Candidate } from '../candidate/model'
import { collection as Interview } from '../interview/model'
import { collection as User } from '../user/model'

// Collection name
export const collection = 'Kanban'

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
  interviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: Interview
  }],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: User
  },
  status: {
    type: String,
    required: true
  },
  highlight: {
    type: Boolean,
    required: true,
    default: false
  }
}, {timestamps: true})

// Model
export default mongoose.model(collection, Schema, collection)
