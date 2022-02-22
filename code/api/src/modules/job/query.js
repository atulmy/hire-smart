// App Imports
import params from '../../setup/config/params'
import { authCheck } from '../../setup/helpers/utils'
import validate from '../../setup/helpers/validation'
import Job from './model'

/**
 * Busca trabalho por id
 * 
 * @param {String} params.id id do convite
 * @param {Array} fields.job dados do trabalho que devem ser populados
 * @param {Array} fields.project dados do projeto que devem ser populados
 * @param {Object} auth para autorizar requisição
 * @Throws Error se id for vazio
 * @Throws Error se houver falha ao buscar trabalho no banco de dados
 * @Throws Error se usuário não estiver autenticado
 * @returns {Object} trabalho
 */
export async function job({ params: { id }, fields = { job: [], project: [] }, auth }) {
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
      const data = await Job
        .findOne({ _id: id })
        .select(fields.job)
        .populate({ path: 'projectId', select: fields.project })

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
 * Busca trabalho por projeto
 * 
 * @param {String} params.projectId id do convite
 * @param {Array} fields campos que devem ser populados
 * @param {Object} auth para autorizar requisição
 * @Throws Error se projectId for vazio
 * @Throws Error se houver falha ao buscar trabalho no banco de dados
 * @Throws Error se usuário não estiver autenticado
 * @returns {Object} trabalho
 */
export async function jobsByProject({ params: { projectId }, fields, auth }) {
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
      const data = await Job.find({
        organizationId: auth.user.organizationId,
        projectId
      })
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
