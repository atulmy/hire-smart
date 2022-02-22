// App Imports
import params from '../../setup/config/params'
import { authCheck } from '../../setup/helpers/utils'
import validate from '../../setup/helpers/validation'
import Activity from '../activity/model'
import Job from './model'

/**
 * Cria um novo trabalho
 * 
 * @param {String} params.projectId id do projeto
 * @param {String} params.role função do trabalho
 * @param {String} params.description descrição do trabalho
 * @param {Object} auth para autorizar requisição
 * @Throws Error se projectid for vazio
 * @Throws Error se role for vazio
 * @Throws Error se houver falha ao criar trabalho no banco de dados
 * @Throws Error se usuário não estiver autenticado
 * @returns {Object} trabalho
 */
export async function jobCreate({ params: { projectId, role, description = '' }, auth }) {
  if (authCheck(auth)) {
    // Validation rules
    const rules = [
      {
        data: { value: projectId },
        check: 'notEmpty',
        message: params.common.message.error.invalidData
      },
      {
        data: { value: role },
        check: 'notEmpty',
        message: 'Please enter a valid role.'
      }
    ]

    // Validate
    try {
      validate(rules)
    } catch (error) {
      throw new Error(error.message)
    }

    try {
      const job = await Job.create({
        organizationId: auth.user.organizationId,
        projectId,
        userId: auth.user._id,
        role,
        description
      })

      if (job) {
        // Log activity
        await Activity.create({
          organizationId: auth.user.organizationId,
          userId: auth.user._id,
          projectId,
          jobId: job._id,
          action: params.activity.types.create,
          message: `${auth.user.name} added a new job ${role}.`
        })
      }

      return {
        data: job
      }
    } catch (error) {
      throw new Error(params.common.message.error.server)
    }
  }

  throw new Error(params.user.message.error.auth)
}

/**
 * Atualiza um trabalho
 * 
 * @param {String} params.id id do trabalho
 * @param {String} params.projectId id do projeto
 * @param {String} params.role função do trabalho
 * @param {String} params.description descrição do trabalho
 * @param {Object} auth para autorizar requisição
 * @Throws Error se id for vazio
 * @Throws Error se projectid for vazio
 * @Throws Error se role for vazio
 * @Throws Error se houver falha ao atualizar trabalho no banco de dados
 * @Throws Error se usuário não estiver autenticado
 * @returns {Object} trabalho
 */
export async function jobUpdate({ params: { id, projectId, role, description = '' }, auth }) {
  if (authCheck(auth)) {
    // Validation rules
    const rules = [
      {
        data: { value: id },
        check: 'notEmpty',
        message: params.common.message.error.invalidData
      },
      {
        data: { value: role },
        check: 'notEmpty',
        message: 'Please enter a valid role.'
      }
    ]

    // Validate
    try {
      validate(rules)
    } catch (error) {
      throw new Error(error.message)
    }

    try {
      const data = await Job.updateOne(
        { _id: id },
        {
          $set: {
            projectId,
            role,
            description
          }
        }
      )

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
 * Remove um trabalho
 * 
 * @param {String} params.id id do trabalho
 * @param {Object} auth para autorizar requisição
 * @Throws Error se id for vazio
 * @Throws Error se houver falha ao remover trabalho no banco de dados
 * @Throws Error se usuário não estiver autenticado
 * @returns {Object} id do trabalho
 */
export async function jobRemove(parentValue, { id }, { auth }) {
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
      const data = await Job.remove({
        _id: _id,
        userId: auth.user._id
      })

      return {
        data
      }
    } catch (error) {
      throw new Error(params.common.message.error.server)
    }
  }

  throw new Error(params.user.message.error.auth)
}
