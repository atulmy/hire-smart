// App Imports
import Organization from '../organization/model'
import User from '../user/model'
import Client from '../client/model'
import Panel from './model'

// Seeds
export default async function () {
  console.log('SEED - Panel..')

  const user = await User.findOne({ email: 'user@hiresmart.app' })
  const organization = await Organization.findOne()
  const client = await Client.findOne()

  await Panel.create({
    organizationId: organization._id,
    userId: user._id,
    clientId: client._id,
    name: 'Ned Stark',
    email: 'ned@stark.com',
    mobile: '9876543210'
  })
}
