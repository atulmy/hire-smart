// App Imports
import Organization from '../organization/model'
import User from '../user/model'
import Client from './model'

// Seeds
export default async function () {
  console.log('SEED - Client..')

  const user = await User.findOne({ email: 'user@hiresmart.in' })
  const organization = await Organization.findOne()

  await Client.create({
    organizationId: organization._id,
    userId: user._id,
    name: 'Happytime',
    description: 'IT Software and Services',
  })

  await Client.create({
    organizationId: organization._id,
    userId: user._id,
    name: 'Forestics',
    description: 'Financial Support and Services'
  })
}
