// Imports
import mongoose from 'mongoose'

// Schema
const Schema = new mongoose.Schema({
  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Organization'
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Client'
  },
  candidateId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Candidate'
  },
  panelId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Panel'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
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
export default mongoose.model('Interview', Schema, 'Interview')
