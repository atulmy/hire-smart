// Imports
import mongoose from 'mongoose'

// Schema
const Schema = new mongoose.Schema({
  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  candidateId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  panelId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  dateTime: {
    type: Date,
    default: new Date()
  },
  mode: {
    type: String
  },
}, {timestamps: true})

// Model
export default mongoose.model('Interview', Schema, 'Interview')
