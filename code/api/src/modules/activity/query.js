// App Imports
import params from '../../setup/config/params'
import { authCheck } from '../../setup/helpers/utils'
import validate from '../../setup/helpers/validation'
import Activity from './model'

/**
 * Lista atividades por id da Organzização
 * 
 * @param {Array} fields quais campos devem ser retornados
 * @param {Object} auth para autorizar requisição
 * @Throws Error se houver falha ao buscar atividades no banco de dados
 * @Throws Error se usuário não estiver autenticado
 * @returns {Object} atividades vinculadas
 */
export async function activitiesByOrganization({ fields, auth }) {
  if (authCheck(auth)) {
    try {
      const data = await Activity.find({
        organizationId: auth.user.organizationId
      })
        .sort({ createdAt: -1 })
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
 * Lista atividades por id do Projeto de uma Organização
 * 
 * @param {String} params.projectId para filtro
 * @param {Array} fields quais campos devem ser retornados
 * @param {Object} auth para autorizar requisição
 * @Throws Error se projectId for vazio
 * @Throws Error se houver falha ao buscar atividades no banco de dados
 * @Throws Error se usuário não estiver autenticado
 * @returns {Object} atividades vinculadas
 */
export async function activitiesByProject({ params: { projectId }, fields, auth }) {
  if (authCheck(auth)) {
    // Validation rules
    const rules = [
      {
        data: { value: projectId },
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
      const data = await Activity.find({
        organizationId: auth.user.organizationId,
        projectId
      })
        .sort({ createdAt: -1 })
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
 * Lista atividades por id do Candidado de uma Organização
 * 
 * @param {String} params.candidateId para filtro
 * @param {Array} fields quais campos devem ser retornados
 * @param {Object} auth para autorizar requisição
 * @Throws Error se candidateId for vazio
 * @Throws Error se houver falha ao buscar atividades no banco de dados
 * @Throws Error se usuário não estiver autenticado
 * @returns {Object} atividades vinculadas
 */
export async function activitiesByCandidate({ params: { candidateId }, fields, auth }) {
  if (authCheck(auth)) {
    // Validation rules
    const rules = [
      {
        data: { value: candidateId },
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
      const data = await Activity.find({
        organizationId: auth.user.organizationId,
        candidateId
      })
        .sort({ createdAt: 1 })
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
