// Imports
import mongoose from 'mongoose'

// Schema
const Schema = new mongoose.Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  candidateId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  interviewId: {
    type: mongoose.Schema.Types.ObjectId
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
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
