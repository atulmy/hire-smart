// App Imports
import params from '../../setup/config/params'
import { authCheck } from '../../setup/helpers/utils'
import validate from '../../setup/helpers/validation'
import Organization from './model'

/**
 * Busca organização por id
 * 
 * @param {String} params.id id da organização
 * @param {Object} auth para autorizar requisição
 * @Throws Error se id for vazio
 * @Throws Error se houver falha ao buscar organização no banco de dados
 * @Throws Error se usuário não estiver autenticado
 * @returns {Object} organização
 */
export async function organization({ params: { id }, auth }) {
  if (authCheck(auth)) {
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

    const organization = await Organization.findOne({ _id: id })

    return {
      data: organization
    }
  }

  throw new Error(params.user.message.error.auth)
}

/**
 * Busca organização por usuário
 * 
 * @param {Array} fields campos que devem ser populados
 * @param {Object} auth para autorizar requisição
 * @Throws Error se houver falha ao buscar organização no banco de dados
 * @Throws Error se usuário não estiver autenticado
 * @returns {Object} organização
 */
export async function organizationByUser({ fields, auth }) {
  if (authCheck(auth)) {
    try {
      const organization = await Organization
        .findOne({ _id: auth.user.organizationId })
        .select(fields)

      return {
        data: organization
      }
    } catch (error) {
      throw new Error(params.common.message.error.server)
    }
  }

  throw new Error(params.user.message.error.auth)
}

/**
 * Busca todas organizações
 * 
 * @param {Array} fields campos que devem ser populados
 * @param {Object} auth para autorizar requisição
 * @Throws Error se houver falha ao buscar organização no banco de dados
 * @Throws Error se usuário não estiver autenticado
 * @returns {Object} organização
 */
export async function organizationsByUser({ fields, auth }) {
  if (authCheck(auth)) {
    try {
      const organizations = await Organization
        .find({ userId: auth.user._id })
        .select(fields)

      return {
        data: organizations
      }
    } catch (error) {
      throw new Error(params.common.message.error.server)
    }
  }

  throw new Error(params.user.message.error.auth)
}
