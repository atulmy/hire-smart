// Imports
import mongoose from 'mongoose'

// Schema
const Schema = new mongoose.Schema({
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
  interviewId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Interview'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  status: {
    type: String,
    required: true
  },
  highlight: {
    type: Boolean,
    required: true,
    default: false
  }
}, {timestamps: true})

// Model
export default mongoose.model('Kanban', Schema, 'Kanban')
