// Imports
import mongoose from 'mongoose'

// App Imports
import { collection as Organization } from '../organization/model'
import { collection as User } from '../user/model'

// Collection name
export const collection = 'Email'

// Schema
const Schema = new mongoose.Schema({
  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Organization,
    index: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User
  },
  toName: {
    type: String
  },
  toEmail: {
    type: String,
    required: true
  },
  fromName: {
    type: String,
    required: true
  },
  fromEmail: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  }
}, {timestamps: true})

// Model
export default mongoose.model(collection, Schema, collection)
