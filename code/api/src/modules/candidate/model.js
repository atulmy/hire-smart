// Imports
import mongoose from 'mongoose'

// App Imports
import { collection as Organization } from '../organization/model'
import { collection as Client } from '../client/model'
import { collection as User } from '../user/model'

// Collection name
export const collection = 'Candidate'

// Schema
const Schema = new mongoose.Schema({
  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: Organization
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Client
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: User
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
  },
  experience: {
    type: String,
    required: true
  },
  resume: {
    type: String,
    required: true
  },
  salaryCurrent: {
    type: String
  },
  salaryExpected: {
    type: String
  },
}, {timestamps: true})

// Model
export default mongoose.model(collection, Schema, collection)
