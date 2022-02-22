// App Imports
import params from '../../setup/config/params'
import { authCheck } from '../../setup/helpers/utils'
import validate from '../../setup/helpers/validation'
import Interviewer from './model'

/**
 * Busca entrevistador por id
 * 
 * @param {String} params.id id do entrevistador
 * @param {Object} auth para autorizar requisição
 * @Throws Error se id for vazio
 * @Throws Error se houver falha ao buscar entrevistador no banco de dados
 * @Throws Error se usuário não estiver autenticado
 * @returns {Object} entrevistador
 */
export async function interviewer({ params: { id } , auth}) {
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
      const data = await Interviewer.findOne({ _id: id })

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
 * Busca entrevistador por projeto
 * 
 * @param {String} params.projectId id do projeto
 * @param {Array} fields.interviewer dados do entrevistador que devem ser populados
 * @param {Array} fields.project dados do projeto que devem ser populados
 * @param {Object} auth para autorizar requisição
 * @Throws Error se projectId for vazio
 * @Throws Error se houver falha ao buscar entrevistador no banco de dados
 * @Throws Error se usuário não estiver autenticado
 * @returns {Object} entrevistador
 */
export async function interviewersByProject({ params: { projectId }, fields = { interviewer: [], project: [] }, auth }) {
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
      const data = await Interviewer.find({
        organizationId: auth.user.organizationId,
        projectId
      })
        .select(fields.interviewer)
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
 * Busca entrevistador por organização
 * 
 * @param {Array} fields.interviewer dados do entrevistador que devem ser populados
 * @param {Array} fields.project dados do projeto que devem ser populados
 * @param {Object} auth para autorizar requisição
 * @Throws Error se houver falha ao buscar entrevistador no banco de dados
 * @Throws Error se usuário não estiver autenticado
 * @returns {Object} entrevistador
 */
export async function interviewersByOrganization({ fields = { interviewer: [], project: [] }, auth }) {
  if (authCheck(auth)) {
    try {
      const data = await Interviewer.find({
        organizationId: auth.user.organizationId
      })
        .select(fields.interviewer)
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
