// Imports
import mongoose from 'mongoose'

// App Imports
import params from '../../setup/config/params'
import { collection as Organization } from '../organization/model'

// Collection name
export const collection = 'User'

// Schema
const Schema = new mongoose.Schema({
  organizationId: {
    type: String,
    required: true,
    ref: Organization
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    default: params.user.roles.user.key
  },
  demo: {
    type: Boolean,
    required: true,
    default: true
  }
}, {timestamps: true})

// Model
export default mongoose.model(collection, Schema, collection)
