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
    const userDetails = user.get()

    // User exists
    const passwordMatch = await bcrypt.compare(password, userDetails.password)

    if (!passwordMatch) {
      // Incorrect password
      throw new Error(`Sorry, the password you entered is incorrect. Please try again.`)
    } else {
      const token = {
        id: userDetails._id,
        organizationId: userDetails.organizationId,
        name: userDetails.name,
        email: userDetails.email,
        role: userDetails.role
      }

      return {
        user: userDetails,
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

