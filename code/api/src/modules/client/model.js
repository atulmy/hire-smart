// Imports
import mongoose from 'mongoose'

// Schema
const Schema = new mongoose.Schema({
  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
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
}, {timestamps: true})

// Model
export default mongoose.model('Client', Schema, 'Client')
