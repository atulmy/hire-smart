// App Imports
import params from '../../setup/config/params'
import validate from '../../setup/helpers/validation'
import { authCheck } from '../../setup/helpers/utils'
import Project from './model'

/**
 * Busca projeto por id
 * 
 * @param {String} params.id id da organização
 * @param {Object} auth para autorizar requisição
 * @Throws Error se id for vazio
 * @Throws Error se houver falha ao buscar projeto no banco de dados
 * @Throws Error se usuário não estiver autenticado
 * @returns {Object} projeto
 */
export async function project({ params: { id }, auth }) {
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

    try {
      const data = await Project.findOne({ _id: id })

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
 * Busca projeto por organização
 * 
 * @param {Array} fields campos que devem ser populados
 * @param {Object} auth para autorizar requisição
 * @Throws Error se id for vazio
 * @Throws Error se houver falha ao buscar projeto no banco de dados
 * @Throws Error se usuário não estiver autenticado
 * @returns {Object} projeto
 */
export async function projectsByOrganization({ fields, auth }) {
  if (authCheck(auth)) {
    try {
      const data = await Project
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
