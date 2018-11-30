// Imports
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// App Imports
import { SECURITY_SECRET } from '../../setup/config/env'
import params from '../../setup/config/params'
import { authCheck } from '../../setup/helpers/utils'
import validate from '../../setup/helpers/validation'
import User, { collection as user } from './model'

// Login
export async function userLogin({ params: { email, password }, translate }) {
  // Validation rules
  const rules = [
    {
      data: { value: email },
      check: 'email',
      message: translate.t('user.messages.fields.email')
    },
    {
      data: { value: password, length: params.user.rules.passwordMinLength },
      check: 'lengthMin',
      message: translate.t('user.messages.fields.passwordMinLength', { length: params.user.rules.passwordMinLength })
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
          data: userAuthResponse(user),
          message: translate.t('user.login.messages.success')
        }
      }
    }
  } catch (error) {
    throw new Error(translate.t('common.messages.error.server'))
  }
}

// Get by ID
export async function getById({ params: { id }, translate }) {
  return await User.findOne({ _id: id })
}

// Get all
export async function getAll() {
  return await User.find()
}

// Get all
export async function getByOrganization({ params: { id }, auth, translate }) {
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
