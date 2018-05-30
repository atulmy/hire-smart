// App Imports
import Organization from '../organization/model'
import User from '../user/model'
import Client from '../client/model'
import Candidate from './model'

// Seeds
export default async function () {
  console.log('SEED - Candidate..')

  const user = await User.findOne({ email: 'user@hiresmart.app' })
  const organization = await Organization.findOne()
  const client = await Client.findOne()

  await Candidate.create({
    organizationId: organization._id,
    userId: user._id,
    clientId: client._id,
    name: 'Arya Stark',
    email: 'arya@stark.com',
    mobile: '9876543210',
    experience: '5.5',
    resume: 'resume.pdf',
    salaryCurrent: '10 LPA',
    salaryExpected: '15 LPA'
  })
}
