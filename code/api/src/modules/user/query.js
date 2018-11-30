// Imports
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// App Imports
import { SECURITY_SECRET } from '../../setup/config/env'
import params from '../../setup/config/params'
import { authCheck } from '../../setup/helpers/utils'
import validate from '../../setup/helpers/validation'
import User from './model'

// Login
export async function userLogin({ params: { email, password } }) {
  // Validation rules
  const rules = [
    {
      data: { value: email },
      check: 'email',
      message: 'Please enter valid email.'
    },
    {
      data: { value: password, length: params.user.rules.passwordMinLength },
      check: 'lengthMin',
      message: `Please enter valid password. Minimum ${ params.user.rules.passwordMinLength } is required.`
    }
  ]

  // Validate
  try {
    validate(rules)
  } catch(error) {
    throw new Error(error.message)
  }

  // Check if user exists with same email
  try {
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
        return {
          data: userAuthResponse(user)
        }
      }
    }
  } catch (error) {
    throw new Error('There was some server error.')
  }
}

// Get by ID
export async function user({ params: { id } }) {
  if(authCheck(auth)) {
    return await User.findOne({ _id: id })
  }

  throw new Error('You are not allowed to perform this action.')
}

// Get all
export async function users() {
  if(authCheck(auth)) {
    return await User.find()
  }

  throw new Error('You are not allowed to perform this action.')
}

// Get all
export async function usersByOrganization({ params: { id }, auth }) {
  if(authCheck(auth)) {
    return await User.find({ organizationId: auth.user.organizationId })
  }

  throw new Error('Please login to view your organization.')
}

// Auth Response (token and user info)
export function userAuthResponse({ _id, organizationId, name, email, role, demo }) {
  return {
    token: jwt.sign({ id: _id }, SECURITY_SECRET),
    user: { _id, organizationId, name, email, role, demo }
  }
}
