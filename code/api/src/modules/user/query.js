// Imports
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// App Imports
import { SECURITY_SECRET } from '../../setup/config/env'
import params from '../../setup/config/params'
import { authCheck } from '../../setup/helpers/utils'
import validate from '../../setup/helpers/validation'
import User from './model'

/**
 * Login
 * 
 * @param {String} params.email email do usuário 
 * @param {String} params.password senha do usuário 
 * @Throws Error se email for inválido
 * @Throws Error se senha for inválida
 * @Throws Error se houver falha ao buscar o usuário no banco de dados
 * @returns token e usuário
 */
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
      message: `Please enter valid password. Minimum ${params.user.rules.passwordMinLength} is required.`
    }
  ]

  // Validate
  try {
    validate(rules)
  } catch (error) {
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
      response.message = `We do not have any user registered with ${email} email address. Please signup.`
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

/**
 * Buscar usuário por id
 * 
 * @param {String} params.id id do usuário 
 * @param {String} params.password senha do usuário 
 * @param {Object} auth para autorizar requisição
 * @Throws Error se id for vazio
 * @Throws Error se houver falha ao buscar o usuário no banco de dados
 * @Throws Error se usuário não estiver autenticado
 * @returns usuário
 */
export async function user({ params: { id }, auth }) {
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
  } catch (error) {
    throw new Error(error.message)
  }

  if (authCheck(auth)) {
    try {
      const data = await User.findOne({ _id: id })

      return {
        data
      }
    } catch (error) {
      throw new Error(params.common.message.error.server)
    }
  }

  throw new Error(params.user.message.error.auth)
}

/**
 * Buscar usuário por organização
 * 
 * @param {Array} fields campos que devem ser populados
 * @param {Object} auth para autorizar requisição
 * @Throws Error se houver falha ao buscar o usuário no banco de dados
 * @Throws Error se usuário não estiver autenticado
 * @returns usuário
 */
export async function usersByOrganization({ fields, auth }) {
  if (authCheck(auth)) {
    try {
      const data = await User
        .find({ organizationId: auth.user.organizationId })
        .select(fields)

      return {
        data
      }
    } catch (error) {
      throw new Error(params.common.message.error.server)
    }
  }

  throw new Error(params.user.message.error.auth)
}

/**
 * Constrói objeto de autenticação de usuário
 * 
 * @param {String} _id id do usuário
 * @param {String} organizationId id da organização
 * @param {String} name nome do usuário
 * @param {String} email email do usuário
 * @param {String} role perfil do usuário
 * @param {Boolean} demo usuário de demonstração
 * @returns token e usuário
 */
export function userAuthResponse({ _id, organizationId, name, email, role, demo }) {
  return {
    token: jwt.sign({ id: _id }, SECURITY_SECRET),
    user: { _id, organizationId, name, email, role, demo }
  }
}
