// App Imports
import Organization from '../organization/model'
import User from '../user/model'
import Project from '../project/model'
import Interviewer from './model'

// Seeds
export default async function () {
  console.log('SEED - Interviewer..')

  const user = await User.findOne({ email: 'user@hiresmart.app' })
  const organization = await Organization.findOne()
  const project = await Project.findOne()

  await Interviewer.create({
    organizationId: organization._id,
    userId: user._id,
    projectId: project._id,
    name: 'Rohan Josh',
    email: 'rohan@hiresmart.app',
    mobile: '9876543210'
  })
}
