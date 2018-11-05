// Imports
import mongoose from 'mongoose'

// App Imports
import { collection as Organization } from '../organization/model'

// Collection name
export const collection = 'Feedback'

// Schema
const Schema = new mongoose.Schema({
  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: Organization,
    index: true
  },
  interviewId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Interview'
  },
  text: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
}, {timestamps: true})

// Model
export default mongoose.model(collection, Schema, collection)
