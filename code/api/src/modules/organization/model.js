// Imports
import mongoose from 'mongoose'

// Collection name
export const collection = 'Organization'

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
export default mongoose.model(collection, Schema, collection)
