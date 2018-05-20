// Imports
import mongoose from 'mongoose'

// App Imports
import params from '../../setup/config/params'

// Schema
const Schema = new mongoose.Schema({}, {timestamps: true})

// Model
export default mongoose.model('DemoUser', Schema)
