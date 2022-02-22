// Imports
import isEmpty from 'lodash/isEmpty'

// App Imports
import params from '../../setup/config/params'
import { authCheck } from '../../setup/helpers/utils'
import validate from '../../setup/helpers/validation'
import Kanban from '../kanban/model'
import Activity from '../activity/model'
import Candidate from './model'

/**
 * Adiciona um novo candidato
 * 
 * @param {String} params.projectId relacionado ao candidato
 * @param {String} params.jobId relacionado ao candidato
 * @param {String} params.name nome do candidato
 * @param {String} params.email email do candidato
 * @param {String} params.mobile telefone do candidato
 * @param {String} params.experience tempo em anos de experiência do candidato
 * @param {String} params.resume currículo do candidato
 * @param {String} params.salaryCurrent salário atual do candidato
 * @param {String} params.salaryExpected intenção salarial do candidato 
 * @param {Object} auth para autorizar requisição
 * @Throws Error se projectId for vazio
 * @Throws Error se name for vazio
 * @Throws Error se email for vazio
 * @Throws Error se mobile for vazio
 * @Throws Error se experience for vazio
 * @Throws Error se resume for vazio
 * @Throws Error se houver falha ao criar candidato no banco de dados
 * @Throws Error se usuário não estiver autenticado
 * @returns {Object} candidato criado
 */
export async function candidateCreate({ params: { projectId, jobId = '', name, email, mobile, experience, resume, salaryCurrent = '', salaryExpected = '' }, auth }) {
  if (authCheck(auth)) {
    // Validation rules
    const rules = [
      {
        data: { value: projectId },
        check: 'notEmpty',
        message: params.common.message.error.invalidData
      },
      {
        data: { value: name },
        check: 'notEmpty',
        message: 'Please enter a valid name.'
      },
      {
        data: { value: email },
        check: 'email',
        message: 'Please enter a valid email.'
      },
      {
        data: { value: mobile },
        check: 'notEmpty',
        message: 'Please enter a valid mobile number.'
      },
      {
        data: { value: experience },
        check: 'notEmpty',
        message: 'Please enter a valid experience in years.'
      },
      {
        data: { value: resume },
        check: 'notEmpty',
        message: 'Please upload resume.'
      }
    ]

    // Validate
    try {
      validate(rules)
    } catch (error) {
      throw new Error(error.message)
    }

    try {
      let item = {
        organizationId: auth.user.organizationId,
        projectId,
        userId: auth.user._id,
        name,
        email,
        mobile,
        experience,
        resume,
        salaryCurrent,
        salaryExpected
      }
      if (!isEmpty(jobId)) {
        item.jobId = jobId
      }

      const candidate = await Candidate.create(item)

      if (candidate) {
        const kanban = await Kanban.create({
          organizationId: auth.user.organizationId,
          projectId,
          candidateId: candidate._id,
          userId: auth.user._id,
          status: params.kanban.columns[0].key,
          highlight: false
        })

        // Log activity
        await Activity.create({
          organizationId: auth.user.organizationId,
          userId: auth.user._id,
          projectId,
          candidateId: candidate._id,
          kanbanId: kanban._id,
          action: params.activity.types.create,
          message: `${auth.user.name} added a new candidate ${name} (${email}).`
        })
      }

      return {
        data: candidate
      }
    } catch (error) {
      throw new Error(params.common.message.error.server)
    }
  }

  throw new Error(params.user.message.error.auth)
}

/**
 * Atualiza um candidato
 * 
 * @param {String} params.id id do candidato
 * @param {String} params.projectId relacionado ao candidato
 * @param {String} params.jobId relacionado ao candidato
 * @param {String} params.name nome do candidato
 * @param {String} params.email email do candidato
 * @param {String} params.mobile telefone do candidato
 * @param {String} params.experience tempo em anos de experiência do candidato
 * @param {String} params.resume currículo do candidato
 * @param {String} params.salaryCurrent salário atual do candidato
 * @param {String} params.salaryExpected intenção salarial do candidato 
 * @param {Object} auth para autorizar requisição
 * @Throws Error se id do candidato for vazio
 * @Throws Error se projectId for vazio
 * @Throws Error se name for vazio
 * @Throws Error se email for vazio
 * @Throws Error se mobile for vazio
 * @Throws Error se experience for vazio
 * @Throws Error se resume for vazio
 * @Throws Error se houver falha ao atualizar candidato no banco de dados
 * @Throws Error se usuário não estiver autenticado
 * @returns {Object} candidato criado
 */
export async function candidateUpdate({ params: { id, projectId, jobId = '', name, email, mobile, experience, resume, salaryCurrent = '', salaryExpected = '' }, auth }) {
  if (authCheck(auth) && !isEmpty(id)) {
    // Validation rules
    const rules = [
      {
        data: { value: id },
        check: 'notEmpty',
        message: params.common.message.error.invalidData
      },
      {
        data: { value: projectId },
        check: 'notEmpty',
        message: params.common.message.error.invalidData
      },
      {
        data: { value: name },
        check: 'notEmpty',
        message: 'Please enter a valid name.'
      },
      {
        data: { value: email },
        check: 'email',
        message: 'Please enter a valid email.'
      },
      {
        data: { value: mobile },
        check: 'notEmpty',
        message: 'Please enter a valid mobile number.'
      },
      {
        data: { value: experience },
        check: 'notEmpty',
        message: 'Please enter a valid experience in years.'
      },
      {
        data: { value: resume },
        check: 'notEmpty',
        message: 'Please upload resume.'
      }
    ]

    // Validate
    try {
      validate(rules)
    } catch (error) {
      throw new Error(error.message)
    }

    try {
      let item = {
        projectId,
        name,
        email,
        mobile,
        experience,
        resume,
        salaryCurrent,
        salaryExpected
      }
      if (!isEmpty(jobId)) {
        item.jobId = jobId
      }

      const candidate = await Candidate.updateOne({ _id: id }, { $set: item })

      if (candidate) {
        await Kanban.updateOne(
          {
            organizationId: auth.user.organizationId,
            candidateId: id
          },
          { projectId }
        )
      }

      return {
        data: candidate
      }
    } catch (error) {
      throw new Error(params.common.message.error.server)
    }
  }

  throw new Error(params.user.message.error.auth)
}

/**
 * Remove um candidato
 * 
 * @param {String} params.id id do candidato
 * @param {Object} auth para autorizar requisição
 * @Throws Error se id do candidato for vazio
 * @Throws Error se houver falha ao remover candidato no banco de dados
 * @Throws Error se usuário não estiver autenticado
 * @returns {Object} id do candidato removido
 */
export async function candidateRemove({ params: { id }, auth }) {
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
      const data = await Candidate.remove({
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
