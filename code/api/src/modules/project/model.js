// Imports
import mongoose from 'mongoose'

// App Imports
import { collection as Organization } from '../organization/model'
import { collection as User } from '../user/model'

// Collection name
export const collection = 'Project'

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
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
}, {timestamps: true})

// Model
export default mongoose.model(collection, Schema, collection)
