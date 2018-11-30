// Imports
import bcrypt from 'bcrypt'

// App Imports
import { SECURITY_SALT_ROUNDS } from '../../setup/config/env'
import params from '../../setup/config/params'
import Organization from '../organization/model'
import User from './model'

// Seeds
export default async function() {
  console.log('SEED - Users..')

  const organization = await Organization.findOne()

  const users = [
    {
      organizationId: organization._id,
      name: 'Jon Doe',
      email: 'user@hiresmart.app',
      password: '123456',
      role: params.user.roles.user.key,
      admin: true,
      demo: false
    }
  ]

  for (const user of users) {
    user.password = await bcrypt.hash(user.password, SECURITY_SALT_ROUNDS)
    await User.create(user)
  }
}
