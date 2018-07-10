// Imports
import mongoose from 'mongoose'

// App Imports
import { collection as Organization } from '../organization/model'
import { collection as Project } from '../project/model'
import { collection as User } from '../user/model'

// Collection name
export const collection = 'Interviewer'

// Schema
const Schema = new mongoose.Schema({
  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: Organization,
    index: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: User
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Project
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  mobile: {
    type: String,
    required: true
  }
}, {timestamps: true})

// Model
export default mongoose.model(collection, Schema, collection)
