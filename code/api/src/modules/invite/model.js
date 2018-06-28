// Imports
import mongoose from 'mongoose'
import { collection as User } from '../user/model'
import { collection as Organization } from '../organization/model'

// Collection name
export const collection = 'Invite'

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
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  accepted: {
    type: Boolean,
    required: true,
    default: false
  }
}, {timestamps: true})

// Model
export default mongoose.model(collection, Schema, collection)
