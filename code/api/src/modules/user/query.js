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
    const response = {
      success: true,
      message: 'You have been logged in successfully.'
    }

    const user = await User.findOne({ email })

    if (!user) {
      // User does not exists
      response.success = false
      response.message = `We do not have any user registered with ${ email } email address. Please signup.`
    } else {
      // User exists
      const passwordMatch = await bcrypt.compare(password, user.password)

      if (!passwordMatch) {
        // Incorrect password
        response.success = false
        response.message = `Sorry, the password you entered is incorrect. Please try again.`
      } else {
        response.data = userAuthResponse(user)
      }
    }

    return response
  } catch (error) {
    throw new Error(params.common.message.error.server)
  }
}

// Get by ID
export async function user({ params: { id } }) {
  // Validation rules
  const rules = [
    {
      data: { value: id },
      check: 'notEmpty',
      message: params.common.message.error.invalidData
    }
  ]

  // Validate
  try {
    validate(rules)
  } catch(error) {
    throw new Error(error.message)
  }

  if(authCheck(auth)) {
    try {
      const data = await User.findOne({ _id: id })

      return {
        data
      }
    } catch(error) {
      throw new Error(params.common.message.error.server)
    }
  }

  throw new Error(params.user.message.error.auth)
}

// Get by organization
export async function usersByOrganization({ fields, auth }) {
  if(authCheck(auth)) {
    try {
      const data = await User
        .find({ organizationId: auth.user.organizationId })
        .select(fields)

      return {
        data
      }
    } catch(error) {
      throw new Error(params.common.message.error.server)
    }
  }

  throw new Error(params.user.message.error.auth)
}

// Auth Response (token and user info)
export function userAuthResponse({ _id, organizationId, name, email, role, demo }) {
  return {
    token: jwt.sign({ id: _id }, SECURITY_SECRET),
    user: { _id, organizationId, name, email, role, demo }
  }
}
