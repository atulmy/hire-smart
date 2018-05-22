// Imports
import mongoose from 'mongoose'

// Schema
const Schema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  domain: {
    type: String
  }
}, {timestamps: true})

// Model
export default mongoose.model('Organization', Schema, 'Organization')
