// App Imports
import Organization from '../organization/model'
import User from '../user/model'
import Project from '../project/model'
import Job from './model'

// Seeds
export default async function () {
  console.log('SEED - Job..')

  const user = await User.findOne({ email: 'user@hiresmart.app' })
  const organization = await Organization.findOne()
  const projects = await Project.find()

  await Job.create({
    organizationId: organization._id,
    projectId: projects[0]._id,
    userId: user._id,
    role: 'Software Engineer',
    description: 'ReactJS and NodeJS'
  })

  await Job.create({
    organizationId: organization._id,
    projectId: projects[1]._id,
    userId: user._id,
    role: 'UI Designer',
    description: 'Prototyping, InVision, Adobe'
  })
}
