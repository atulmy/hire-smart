// App Imports
import params from '../../setup/config/params'
import { authCheck } from '../../setup/helpers/utils'
import validate from '../../setup/helpers/validation'
import Organization from './model'

/**
 * Cria uma nova organização
 * 
 * @param {String} params.name nome da organização
 * @param {String} params.description descrição da organização
 * @param {String} params.domain domínimo da organização
 * @param {Object} auth para autorizar requisição
 * @Throws Error se name for vazio
 * @Throws Error se houver falha ao criar organização no banco de dados
 * @Throws Error se usuário não estiver autenticado
 * @returns {Object} organização
 */
export async function organizationCreate({ params: { name, description = '', domain = '' }, auth }) {
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
      const data = await Organization.create({
        userId: auth.user._id,
        name,
        description,
        domain
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

/**
 * Atualiza uma organização
 * 
 * @param {String} params.name nome da organização
 * @param {String} params.description descrição da organização
 * @param {String} params.domain domínimo da organização
 * @param {Object} auth para autorizar requisição
 * @Throws Error se name for vazio
 * @Throws Error se houver falha ao atualizar organização no banco de dados
 * @Throws Error se usuário não estiver autenticado
 * @returns {Object} organização
 */
export async function organizationUpdate({ params: { id, name, description = '', domain = '' }, auth }) {
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
      const data = await Organization.updateOne(
        { _id: auth.user.organizationId },
        {
          $set: { name, description, domain }
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
 * Remove uma organização
 * 
 * @param {String} params.id id da organização
 * @param {Object} auth para autorizar requisição
 * @Throws Error se id for vazio
 * @Throws Error se houver falha ao atualizar organização no banco de dados
 * @Throws Error se usuário não estiver autenticado
 * @returns {Object} organização
 */
export async function organizationRemove({ params: { id }, auth }) {
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
      const data = await Organization.remove({
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
