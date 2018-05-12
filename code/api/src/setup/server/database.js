// Imports
import mongoose from 'mongoose'

// Connect database
export default function () {
  console.info('SETUP - Connecting database..')

  mongoose.connect('mongodb://localhost/hiresmart')

  const db = mongoose.connection

  db.on('error', console.error.bind(console, 'connection error:'))
  db.once('open', function() {
    console.info('INFO - Database connected..')
  })
}
