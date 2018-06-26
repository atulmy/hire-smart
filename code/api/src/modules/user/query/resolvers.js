// Imports
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// App Imports
import serverConfig from '../../../setup/config/server'
import User from '../model'

// Login
export async function login(parentValue, { email, password }) {
  const user = await User.findOne({ email })

  if (!user) {
    // User does not exists
    throw new Error(`We do not have any user registered with ${ email } email address. Please signup.`)
  } else {
    // User exists
    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      // Incorrect password
      throw new Error(`Sorry, the password you entered is incorrect. Please try again.`)
    } else {
      const token = {
        id: user._id,
        organizationId: user.organizationId,
        name: user.name,
        email: user.email,
        role: user.role
      }

      return {
        user: user,
        token: jwt.sign(token, serverConfig.secret)
      }
    }
  }
}

// Get by ID
export async function getById(parentValue, { id }) {
  return await User.findOne({ _id: id })
}

// Get all
export async function getAll() {
  return await User.find()
}

// Get all
export async function getByOrganization(parentValue, { id }, { auth }) {
  if(auth.user && auth.user.id) {
    return await User.find({ organizationId: auth.user.organizationId })
  } else {
    throw new Error('Please login to view your organization.')
  }
}

