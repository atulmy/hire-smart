// Imports
import mongoose from 'mongoose'

// App Imports
import { NODE_ENV, MONGO_URL } from '../config/env'
import database from '../server/database'
import user from '../../modules/user/seeds'

// Seed
async function seed() {
  await database()

  console.log('SEED - Started')

  // Clear database
  if(NODE_ENV === 'development') {
    console.log('SEED - Dropping database..')

    await mongoose.connection.dropDatabase()
  }

  // User
  await user()

  // Close connection
  mongoose.connection.close()

  console.log('SEED - Complete.')
}

// Run seeder
seed()
