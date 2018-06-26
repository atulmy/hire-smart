// Imports
import bcrypt from 'bcrypt'

// App Imports
import serverConfig from '../../setup/config/server'
import params from '../../setup/config/params'
import Organization from '../organization/model'
import User from './model'

// Seeds
export default async function () {
  console.log('SEED - User..')

  const organization = await Organization.findOne()

  const passwordHashed = await bcrypt.hash('123', serverConfig.saltRounds)

  await User.create({
    organizationId: organization._id,
    name: 'The Admin',
    email: 'admin@hiresmart.app',
    password: passwordHashed,
    role: params.user.roles.admin.key,
    demo: false
  })

  await User.create({
    organizationId: organization._id,
    name: 'The User',
    email: 'user@hiresmart.app',
    password: passwordHashed,
    role: params.user.roles.user.key,
    demo: false
  })
}
