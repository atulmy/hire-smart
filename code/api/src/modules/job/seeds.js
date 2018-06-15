// App Imports
import Organization from '../organization/model'
import User from '../user/model'
import Client from '../client/model'
import Job from './model'

// Seeds
export default async function () {
  console.log('SEED - Job..')

  const user = await User.findOne({ email: 'user@hiresmart.app' })
  const organization = await Organization.findOne()
  const client = await Client.findOne()

  await Job.create({
    organizationId: organization._id,
    clientId: client._id,
    userId: user._id,
    role: 'Software Engineer',
    description: 'ReactJS and NodeJS'
  })
}
