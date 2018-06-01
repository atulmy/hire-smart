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
    required: true
  },
  mode: {
    type: String,
    required: true
  },
  mode: {
    type: String,
    required: true
  },
}, {timestamps: true})

// Model
export default mongoose.model('Candidate', Schema, 'Candidate')
