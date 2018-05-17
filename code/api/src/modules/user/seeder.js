// Imports
import bcrypt from 'bcrypt'

// App Imports
import serverConfig from '../../setup/config/server'
import params from '../../setup/config/params'
import User from './model'

// Seeds
export default function () {
  console.info('User - Seeding..')

  const passwordHashed = bcrypt.hashSync('123', serverConfig.saltRounds)

  User.create({
    name: 'Admin',
    email: 'admin@hiresmart.in',
    password: passwordHashed,
    role: params.user.roles.admin.key
  })

  User.create({
    name: 'User',
    email: 'user@hiresmart.in',
    password: passwordHashed,
    role: params.user.roles.user.key
  })
}
