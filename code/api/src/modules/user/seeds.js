// Imports
import bcrypt from 'bcrypt'

// App Imports
import serverConfig from '../../setup/config/server'
import params from '../../setup/config/params'
import User from './model'

// Seeds
export default async function () {
  console.log('SEED - User..')

  const passwordHashed = await bcrypt.hash('123', serverConfig.saltRounds)

  await User.create({
    name: 'The Admin',
    email: 'admin@hiresmart.in',
    password: passwordHashed,
    role: params.user.roles.admin.key
  })

  await User.create({
    name: 'The User',
    email: 'user@hiresmart.in',
    password: passwordHashed,
    role: params.user.roles.user.key
  })
}
