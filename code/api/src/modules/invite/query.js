// App Imports
import params from '../../setup/config/params'
import { authCheck } from '../../setup/helpers/utils'
import validate from '../../setup/helpers/validation'
import Invite from './model'

/**
 * Busca convite por id
 * 
 * @param {String} params.id id do convite
 * @Throws Error se id for vazio
 * @Throws Error se houver falha ao buscar convite no banco de dados
 * @returns {Object} convite
 */
export async function invite({ params: { id } }) {
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
    const data = await Invite.findOne({ _id: id, accepted: false })
      .populate('organizationId')

    return {
      data
    }
  } catch (error) {
    throw new Error(params.common.message.error.server)
  }
}

/**
 * Busca convite por organização
 * 
 * @param {Object} auth para autorizar requisição
 * @Throws Error se houver falha ao buscar convite no banco de dados
 * @Throws Error se usuário não estiver autenticado
 * @returns {Object} convite
 */
export async function invitesByOrganization({ auth }) {
  if (authCheck(auth)) {
    try {
      const data = await Invite.find({
        organizationId: auth.user.organizationId,
        accepted: false
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
