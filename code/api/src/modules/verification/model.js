// Imports
import mongoose from 'mongoose'
import { collection as User } from '../user/model'

// App Imports
import params from '../../setup/config/params'

// Collection name
export const collection = 'Verification'

// Schema
const Schema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User
  },
  email: {
    type: String,
    required: true
  },
  code: {
    type: Number,
    required: true
  },
  verified: {
    type: Boolean,
    required: true,
    default: false
  },
  type: {
    type: String,
    required: true,
    default: params.user.verification.signup
  }
}, {timestamps: true})

// Model
export default mongoose.model(collection, Schema, collection)
