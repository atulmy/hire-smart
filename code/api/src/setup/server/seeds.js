// Imports
import mongoose from 'mongoose'

// App Imports
import { MONGO_URL } from '../config/env'

import seed from '../../modules/user/seeder'

mongoose.connect(MONGO_URL).then(() => {
  seed()
})
