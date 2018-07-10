// App Imports
import Organization from '../organization/model'
import User from '../user/model'
import Project from './model'

// Seeds
export default async function () {
  console.log('SEED - Project..')

  const user = await User.findOne({ email: 'user@hiresmart.app' })
  const organization = await Organization.findOne()

  await Project.create({
    organizationId: organization._id,
    userId: user._id,
    name: 'Wolf',
    description: 'IT Software and Services',
  })

  await Project.create({
    organizationId: organization._id,
    userId: user._id,
    name: 'Stark',
    description: 'Financial Support and Services'
  })
}
