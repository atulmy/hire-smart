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
  clientId: {
    type: mongoose.Schema.Types.ObjectId
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  mobile: {
    type: String,
    required: true
  },
  experience: {
    type: String,
    required: true
  },
  resume: {
    type: String,
    required: true
  },
  salaryCurrent: {
    type: String
  },
  salaryExpected: {
    type: String
  },
}, {timestamps: true})

// Model
export default mongoose.model('Candidate', Schema, 'Candidate')
