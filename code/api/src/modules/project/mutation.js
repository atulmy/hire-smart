// App Imports
import params from '../../setup/config/params'
import { authCheck } from '../../setup/helpers/utils'
import validate from '../../setup/helpers/validation'
import Activity from '../activity/model'
import Project from './model'

/**
 * Cria um novo projeto
 * 
 * @param {String} params.name nome do projeto
 * @param {String} params.description descrição do projeto
 * @param {Object} auth para autorizar requisição
 * @Throws Error se name for vazio
 * @Throws Error se houver falha ao criar projeto no banco de dados
 * @Throws Error se usuário não estiver autenticado
 * @returns {Object} projeto
 */
export async function projectCreate({ params: { name, description = '' }, auth }) {
  if (authCheck(auth)) {
    // Validation rules
    const rules = [
      {
        data: { value: name },
        check: 'notEmpty',
        message: 'Please enter valid name.'
      }
    ]

    // Validate
    try {
      validate(rules)
    } catch (error) {
      throw new Error(error.message)
    }

    try {
      const project = await Project.create({
        organizationId: auth.user.organizationId,
        userId: auth.user._id,
        name,
        description
      })

      // Log activity
      if (project) {
        await Activity.create({
          organizationId: auth.user.organizationId,
          userId: auth.user._id,
          projectId: project._id,
          action: params.activity.types.create,
          message: `${auth.user.name} created ${name} project.`
        })
      }

      return {
        data: project
      }
    } catch (error) {
      throw new Error(params.common.message.error.server)
    }
  }

  throw new Error(params.user.message.error.auth)
}

/**
 * Atualiza um projeto
 * 
 * @param {String} params.id id do projeto
 * @param {String} params.name nome do projeto
 * @param {String} params.description descrição do projeto
 * @param {Object} auth para autorizar requisição
 * @Throws Error se id for vazio
 * @Throws Error se name for vazio
 * @Throws Error se houver falha ao atualizar projeto no banco de dados
 * @Throws Error se usuário não estiver autenticado
 * @returns {Object} projeto
 */
export async function projectUpdate({ params: { id, name, description = '' }, auth }) {
  if (authCheck(auth)) {
    // Validation rules
    const rules = [
      {
        data: { value: id },
        check: 'notEmpty',
        message: params.common.message.error.invalidData
      },
      {
        data: { value: name },
        check: 'notEmpty',
        message: 'Please enter valid name.'
      }
    ]

    // Validate
    try {
      validate(rules)
    } catch (error) {
      throw new Error(error.message)
    }

    try {
      const data = await Project.updateOne(
        { _id: id },
        {
          $set: {
            name,
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
 * Remove um projeto
 * 
 * @param {String} params.id id do projeto
 * @param {Object} auth para autorizar requisição
 * @Throws Error se id for vazio
 * @Throws Error se houver falha ao atualizar projeto no banco de dados
 * @Throws Error se usuário não estiver autenticado
 * @returns {Object} projeto
 */
export async function projectRemove({ params: { id }, auth }) {
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
      const data = await Project.remove({
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
