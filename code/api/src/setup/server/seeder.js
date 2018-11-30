// Imports
import mongoose from 'mongoose'

// App Imports
import { NODE_ENV } from '../config/env'
import database from '../server/database'
import organization from '../../modules/organization/seed'
import user from '../../modules/user/seed'
import project from '../../modules/project/seeds'
import job from '../../modules/job/seeds'
import interviewer from '../../modules/interviewer/seeds'
import candidate from '../../modules/candidate/seeds'

// Seeder
async function seeder() {
  console.log('SEED - Started')

  await database()

  // Clear database, only in development, do not do in production. I repeat, do not do it in production or you will be featured on www.commitstrip.com!
  if(NODE_ENV === 'development') { // @temp allow reset database
    console.log('SEED - Dropping database.. ❗')

    await mongoose.connection.dropDatabase()
  }

  // Seeds
  await organization()
  await user()
  await project()
  await job()
  await interviewer()
  await candidate()

  // Close connection
  mongoose.connection.close()

  console.log('SEED - Complete. ✅')
}

// Run seeder
seeder()
