// App Imports
import User from '../user/model'
import Organization from './model'

// Seeds
export default async function () {
  console.log('SEED - Organization..')

  const user = await User.findOne({ email: 'user@hiresmart.in' })

  await Organization.create({
    userId: user._id,
    name: 'Rivernite Inc.',
    description: 'Digital Transformation and Services.'
  })
}
