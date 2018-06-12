// Imports
import mongoose from 'mongoose'

// App Imports
import { collection as Organization } from '../organization/model'
import { collection as Client } from '../client/model'
import { collection as Candidate } from '../candidate/model'
import { collection as Panel } from '../panel/model'
import { collection as User } from '../user/model'

// Collection name
export const collection = 'Interview'

// Schema
const Schema = new mongoose.Schema({
  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: Organization
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: Client
  },
  candidateId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: Candidate
  },
  panelId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: Panel
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
    type: String
  },
}, {timestamps: true})

// Model
export default mongoose.model(collection, Schema, collection)
