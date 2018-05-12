// Imports
import mongoose from 'mongoose'

// Schema
const Schema = new mongoose.Schema({
  title:  String,
  author: String,
  body:   String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs:  Number
  }
})

// Model
export default mongoose.model('User', Schema)
