// Imports
import mongoose from 'mongoose'

// Schema
const Schema = new mongoose.Schema({
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
