// Imports
import mongoose from 'mongoose'

// App Imports
import params from '../../setup/config/params'

// Schema
const Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    default: params.user.roles.user.key
  }
}, {timestamps: true})

// Model
export default mongoose.model('User', Schema, 'User')
