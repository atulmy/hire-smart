// App Imports
import params from '../../setup/config/params'
import { authCheck } from '../../setup/helpers/utils'
import validate from '../../setup/helpers/validation'
import Candidate from './model'

/**
 * Busca candidato por id
 * 
 * @param {String} params.id id do candidato
 * @param {Array} fields.candidate campos do objeto candidato que devem ser obtidos
 * @param {Array} fields.project campos do objeto projeto que devem ser obtidos
 * @param {Array} fields.job campos do objeto trabalho que devem ser obtidos
 * @Throws Error se houver falha ao buscar o candidato no banco de dados 
 * @returns {Object} candidato
 */
export async function candidate({ params: { id }, fields = { candidate: [], project: [], job: [] } }) {
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
    const data = await Candidate.findOne({ _id: id })
      .select(fields.candidate)
      .populate({ path: 'projectId', select: fields.project })
      .populate({ path: 'jobId', select: fields.job })

    return {
      data
    }
  } catch (error) {
    throw new Error(params.common.message.error.server)
  }
}

/**
 * Busca candidato por projeto
 * 
 * @param {String} params.projectId id do projeto
 * @param {Array} fields.candidate campos do objeto candidato que devem ser obtidos
 * @param {Array} fields.job campos do objeto trabalho que devem ser obtidos
 * @Throws Error se houver falha ao buscar candidato no banco de dados
 * @Throws Error se usuário não estiver autenticado
 * @returns {Object} candidato
 */
export async function candidatesByProject({ params: { projectId }, fields = { candidate: [], job: [] }, auth }) {
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
      const data = await Candidate.find({
        organizationId: auth.user.organizationId,
        projectId
      })
        .select(fields.candidate)
        .populate({ path: 'projectId', select: fields.project })
        .populate({ path: 'jobId', select: fields.job })


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
 * Busca candidato por organização
 * 
 * @param {Array} fields.candidate campos do objeto candidato que devem ser obtidos
 * @param {Array} fields.project campos do objeto projeto que devem ser obtidos
 * @param {Array} fields.job campos do objeto trabalho que devem ser obtidos
 * @Throws Error se houver falha ao buscar candidato no banco de dados
 * @Throws Error se usuário não estiver autenticado
 * @returns {Object} candidato
 */
export async function candidatesByOrganization({ fields = { candidate: [], project: [], job: [] }, auth }) {
  if (authCheck(auth)) {
    try {
      const data = await Candidate.find({
        organizationId: auth.user.organizationId
      })
        .select(fields.candidate)
        .populate({ path: 'projectId', select: fields.project })
        .populate({ path: 'jobId', select: fields.job })

      return {
        data
      }
    } catch (error) {
      throw new Error(params.common.message.error.server)
    }
  }

  throw new Error(params.user.message.error.auth)
}
