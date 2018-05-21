// Imports
import mongoose from 'mongoose'

// Schema
const Schema = new mongoose.Schema({}, {timestamps: true})

// Model
export default mongoose.model('DemoUser', Schema, 'DemoUser')
