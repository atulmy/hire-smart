// Imports
import bcrypt from 'bcrypt'
import React from 'react'

// App Imports
import { SECURITY_SALT_ROUNDS } from '../../setup/config/env'
import params from '../../setup/config/params'
import validate from '../../setup/helpers/validation'
import { authCheck, randomNumber } from '../../setup/helpers/utils'
import User from './model'
import { userAuthResponse } from './query'

// Email
import { send as sendEmail } from '../email/send'
import Organization from '../organization/model'
import DemoUser from '../demo-user/model'
import Activity from '../activity/model'
import Verification from '../verification/model'
import Verify from './email/Verify'
import AccountCreatedOrVerified from './email/AccountCreatedOrVerified'
import Invite from '../invite/model'

/**
 * Cria um usuário de demonstração
 * 
 * @param {Object} auth para autorizar requisição
 * @Throws Error se usuário já estiver logado
 * @Throws Error se houver falha ao criar usuário de demonstração no banco de dados
 * @returns {Object} boolean
 */
export async function userStartNow({ auth }) {
  // Check if user is already logged in
  if (authCheck(auth)) {
    throw new Error(`You are already logged in. Please go to your dashboard to continue.`)
  } else {
    try {
      // Create new Organization
      const organization = await Organization.create({
        name: 'Demo Organization'
      })

      // Create a new demo user
      const demoUser = await DemoUser.create({})

      // User does not exists
      const passwordHashed = await bcrypt.hash(demoUser._id + Math.random(), SECURITY_SALT_ROUNDS)

      const user = await User.create({
        organizationId: organization._id,
        name: 'Demo User',
        email: `demo.user+${demoUser._id}@${params.site.domain}`,
        password: passwordHashed,
        admin: true,
        demo: true
      })

      // Log activity - Organization Created
      if (user) {
        await Activity.create({
          organizationId: organization._id,
          userId: user._id,
          action: params.activity.types.create,
          message: `Your organization was created.`
        })
      }

      return {
        data: userAuthResponse(user),
        message: 'You have been logged in successfully.'
      }
    } catch (error) {
      throw new Error(`There was some error. Please try again.`)
    }
  }
}

/**
 * Envia código por email de ativação
 * 
 * @param {String} params.email email de ativação
 * @param {Object} auth para autorizar requisição
 * @Throws Error se email estiver vazio
 * @Throws Error se email já estiver registrado
 * @Throws Error se email não estiver registrado e usuário não estiver logado
 * @Throws Error se houver falha ao buscar usuário ou email registrado no banco de dados
 * @returns {Object} usuário
 */
export async function userVerifySendCode({ params: { email }, auth }) {
  // Validation rules
  const rules = [
    {
      data: { value: email },
      check: 'email',
      message: 'Please enter valid email.'
    }
  ]

  // Validate
  try {
    validate(rules)
  } catch (error) {
    throw new Error(error.message)
  }

  try {
    const user = await User.findOne({ email })

    if (user) {
      // User already exists
      throw new Error(`The email ${email} is already registered. Please try to login.`)
    } else {
      let code

      if (authCheck(auth) && auth.user.demo) {
        const verification = await Verification.findOne({ userId: auth.user._id, email, verified: false, type: params.user.verification.signup })

        if (verification) {
          code = verification.code
        }
      }

      if (!code) {
        code = randomNumber(1000, 9999)

        await Verification.create({
          email,
          code,
          verified: false,
          type: params.user.verification.signup
        })
      }

      await sendEmail({
        to: {
          email: email
        },
        from: {
          name: params.site.emails.help.name,
          email: params.site.emails.help.email
        },
        subject: `Verification Code: ${code}`,
        template:
          <Verify
            code={code}
          />
      })

      return {
        data: true
      }
    }
  } catch (error) {
    throw new Error(params.common.message.error.server)
  }
}

/**
 * Verifica código por email de ativação
 * 
 * @param {String} params.email email de ativação
 * @param {Object} code código de ativação
 * @Throws Error se email não for válido
 * @Throws Error se code for vazio
 * @Throws Error se code for inválido
 * @Throws Error se houver falha ao buscar verificação no banco de dados
 * @returns {Object} boolean
 */
export async function userVerifyCode({ params: { email, code } }) {
  // Validation rules
  const rules = [
    {
      data: { value: email },
      check: 'email',
      message: 'Please enter valid email.'
    },
    {
      data: { value: code },
      check: 'notEmpty',
      message: 'Please enter valid code.'
    }
  ]

  // Validate
  try {
    validate(rules)
  } catch (error) {
    throw new Error(error.message)
  }

  try {
    const verification = await Verification.findOne({ email, code, verified: false, type: params.user.verification.signup })

    if (verification) {
      // Mark as verified
      await Verification.updateOne(
        { _id: verification._id },
        { verified: true }
      )

      return {
        data: true
      }
    } else {
      throw new Error('The code you entered is invalid. Please try again with valid code.')
    }
  } catch (error) {
    throw new Error(params.common.message.error.server)
  }
}

/**
 * Verifica conta do usuário
 * 
 * @param {String} params.email email do usuário
 * @param {String} params.name nome do usuário
 * @param {String} params.password senha do usuário
 * @param {String} params.organizationName nome da organização
 * @param {Object} auth para autorizar requisição
 * @Throws Error se email não for válido
 * @Throws Error se name for vazio
 * @Throws Error se password for inválido
 * @Throws Error se organizationName for vazio
 * @Throws Error se houver falha ao buscar verificação no banco de dados
 * @Throws Error se houver falha ao buscar usuário no banco de dados
 * @Throws Error se email já estiver registrado
 * @returns {Object} token e usuário
 */
export async function userVerifyUpdateAccount({ params: { email, name, password, organizationName }, auth }) {
  // Validation rules
  const rules = [
    {
      data: { value: email },
      check: 'email',
      message: 'Please enter valid email.'
    },
    {
      data: { value: name },
      check: 'notEmpty',
      message: 'Please enter valid name.'
    },
    {
      data: { value: password, length: params.user.rules.passwordMinLength },
      check: 'lengthMin',
      message: `Please enter valid password. Minimum ${params.user.rules.passwordMinLength} is required.`
    },
    {
      data: { value: organizationName },
      check: 'notEmpty',
      message: 'Please enter valid organization name.'
    }
  ]

  // Validate
  try {
    validate(rules)
  } catch (error) {
    throw new Error(error.message)
  }

  try {
    const verification = await Verification.findOne({ email, verified: true, type: params.user.verification.signup })

    const userCheck = await User.findOne({ email: verification.email })

    if (!userCheck) {
      if (verification && verification.verified) {
        let user
        let message

        const passwordHashed = await bcrypt.hash(password, SECURITY_SALT_ROUNDS)
        const organizationDomain = email.split('@')[1]

        if (auth.user && auth.user._id && auth.user.demo) {
          // Update user
          await User.updateOne(
            { _id: auth.user._id },
            {
              $set: {
                email: verification.email,
                password: passwordHashed,
                name,
                demo: false
              }
            }
          )

          // Update organization name
          await Organization.updateOne(
            { _id: auth.user.organizationId },
            {
              $set: {
                name: organizationName,
                domain: organizationDomain
              }
            }
          )

          // Log activity - User joined organization
          await Activity.create({
            organizationId: auth.user.organizationId,
            userId: auth.user._id,
            action: params.activity.types.create,
            message: `${name} (${email}) joined the organization.`
          })

          user = await User.findOne({ _id: auth.user._id })

          message = 'Your account has been verified and updated successfully.'
        } else {
          // Create new user
          const organization = await Organization.create({
            name: organizationName,
            domain: organizationDomain
          })

          // Create user
          user = await User.create({
            organizationId: organization._id,
            name,
            email: verification.email,
            password: passwordHashed,
            admin: true,
            demo: false
          })

          message = 'Your account has been created successfully.'
        }

        await sendEmail({
          to: {
            name,
            email: email
          },
          from: {
            name: params.site.emails.help.name,
            email: params.site.emails.help.email
          },
          subject: message,
          template:
            <AccountCreatedOrVerified
              to={name}
              message={message}
            />
        })

        return {
          data: userAuthResponse(user),
          message: message
        }
      } else {
        throw new Error('The code you entered is invalid. Please try again with valid code.')
      }
    } else {
      throw new Error(`The email ${verification.email} is already registered. Please try to login.`)
    }
  } catch (error) {
    throw new Error(params.common.message.error.server)
  }
}

/**
 * Verifica convite aceito por usuário
 * 
 * @param {String} params.id id do usuário
 * @param {String} params.name nome do usuário
 * @param {String} params.password senha do usuário
 * @param {Object} auth para autorizar requisição
 * @Throws Error se id for vazio
 * @Throws Error se name for vazio
 * @Throws Error se password for inválido
 * @Throws Error se houver falha ao buscar usuário no banco de dados
 * @Throws Error se o convite já estiver expirado
 * @returns {Object} token e usuário
 */
export async function userAcceptInvite({ params: { id, name, password } }) {
  // Validation rules
  const rules = [
    {
      data: { value: id },
      check: 'notEmpty',
      message: 'Please enter valid email.'
    },
    {
      data: { value: name },
      check: 'notEmpty',
      message: 'Please enter valid name.'
    },
    {
      data: { value: password, length: params.user.rules.passwordMinLength },
      check: 'lengthMin',
      message: `Please enter valid password. Minimum ${params.user.rules.passwordMinLength} is required.`
    }
  ]

  // Validate
  try {
    validate(rules)
  } catch (error) {
    throw new Error(error.message)
  }

  try {
    // Users exists with same email check
    const invite = await Invite.findOne({ _id: id, accepted: false })

    if (invite) {
      const passwordHashed = await bcrypt.hash(password, SECURITY_SALT_ROUNDS)

      // Create user
      const user = await User.create({
        organizationId: invite.organizationId,
        name,
        email: invite.email,
        password: passwordHashed,
        admin: false,
        demo: false
      })

      // Set invitation accepted
      await Invite.updateOne(
        { _id: invite._id },
        {
          $set: {
            accepted: true
          }
        }
      )

      // Send email
      const subject = 'Your account has been created successfully.'

      await sendEmail({
        to: {
          name,
          email: invite.email
        },
        from: {
          name: params.site.emails.help.name,
          email: params.site.emails.help.email
        },
        subject,
        template:
          <AccountCreatedOrVerified
            to={name}
            message={subject}
          />
      })

      // Log activity
      if (invite) {
        await Activity.create({
          organizationId: invite.organizationId,
          userId: user._id,
          inviteId: invite._id,
          action: params.activity.types.create,
          message: `${name} (${invite.email}) joined the organization.`
        })
      }

      return {
        data: userAuthResponse(user),
        message: `Invitation accepted successfully. Welcome ${name}!`
      }
    } else {
      // User exists
      throw new Error(`Sorry, this invitation is not valid anymore.`)
    }
  } catch (error) {
    throw new Error(params.common.message.error.server)
  }
}

/**
 * Atualiza usuário
 * 
 * @param {String} params.name nome do usuário
 * @param {Object} auth para autorizar requisição
 * @Throws Error se name for vazio
 * @Throws Error se usuário não estiver autenticado
 * @Throws Error se houver falha ao atualizar usuário no banco de dados
 * @returns {Object} token e usuário
 */
export async function userUpdate({ params: { name }, auth }) {
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
      await User.updateOne({ _id: auth.user._id }, { name })

      const user = await User.findOne({ _id: auth.user._id })

      return {
        data: userAuthResponse(user),
        message: 'Your profile has been updated successfully.'
      }
    } catch (error) {
      throw new Error(params.common.message.error.server)
    }
  }

  throw new Error('Please login to update profile.')
}

/**
 * Reseta senha do usuário
 * 
 * @param {String} params.email email do usuário
 * @Throws Error se email for inválido
 * @Throws Error se houver falha ao buscar usuário no banco de dados
 * @returns {Object} boolean
 */
export async function userResetPasswordSendCode({ params: { email } }) {
  // Validation rules
  const rules = [
    {
      data: { value: email },
      check: 'email',
      message: 'Please enter valid email.'
    }
  ]

  // Validate
  try {
    validate(rules)
  } catch (error) {
    throw new Error(error.message)
  }

  try {
    const user = await User.findOne({ email })

    if (user) {
      let code

      const verification = await Verification.findOne({ email, verified: false, type: params.user.verification.password })

      if (verification) {
        code = verification.code
      }

      if (!code) {
        code = randomNumber(1000, 9999)

        Verification.create({
          userId: user._id,
          email,
          code,
          verified: false,
          type: params.user.verification.password
        })
      }

      await sendEmail({
        to: {
          email: email
        },
        from: {
          name: params.site.emails.help.name,
          email: params.site.emails.help.email
        },
        subject: `Verification Code: ${code}`,
        template:
          <Verify
            code={code}
          />
      })

      return {
        data: true
      }
    } else {
      throw new Error(`The email ${email} is not registered. Please signup.`)
    }
  } catch (error) {
    throw new Error(params.common.message.error.server)
  }
}

/**
 * Verifica resete de senha do usuário
 * 
 * @param {String} params.email email do usuário
 * @param {String} params.code código de ativação para troca de senha
 * @Throws Error se email for inválido
 * @Throws Error se code for vazio ou inválido
 * @Throws Error se houver falha ao buscar usuário no banco de dados
 * @returns {Object} boolean
 */
export async function userResetPasswordVerifyCode({ params: { email, code } }) {
  // Validation rules
  const rules = [
    {
      data: { value: email },
      check: 'email',
      message: 'Please enter valid email.'
    },
    {
      data: { value: code },
      check: 'notEmpty',
      message: 'Please enter valid code.'
    }
  ]

  // Validate
  try {
    validate(rules)
  } catch (error) {
    throw new Error(error.message)
  }

  try {
    const verification = await Verification.findOne({ email, code, verified: false, type: params.user.verification.password })

    if (verification) {
      // Mark as verified
      await Verification.updateOne(
        { _id: verification._id },
        { verified: true }
      )

      return {
        data: true
      }
    } else {
      throw new Error('The code you entered is invalid. Please try again with valid code.')
    }
  } catch (error) {
    throw new Error(params.common.message.error.server)
  }
}

/**
 * Atualiza resete de senha do usuário
 * 
 * @param {String} params.email email do usuário
 * @param {String} params.password nova senha do usuário
 * @Throws Error se email for inválido
 * @Throws Error se senha for inválida
 * @Throws Error se houver falha ao buscar usuário no banco de dados
 * @returns {Object} boolean
 */
export async function userResetPasswordUpdate({ params: { email, password } }) {
  // Validation rules
  const rules = [
    {
      data: { value: email },
      check: 'email',
      message: 'Please enter valid email.'
    },
    {
      data: { value: password, length: params.user.rules.passwordMinLength },
      check: 'lengthMin',
      message: `Please enter valid password. Minimum ${params.user.rules.passwordMinLength} is required.`
    }
  ]

  // Validate
  try {
    validate(rules)
  } catch (error) {
    throw new Error(error.message)
  }

  try {
    const verification = await Verification.findOne({ email, verified: true, type: params.user.verification.password })

    const user = await User.findOne({ email: verification.email })

    if (user) {
      if (verification && verification.verified) {
        const passwordHashed = await bcrypt.hash(password, SECURITY_SALT_ROUNDS)

        // Update user
        const userUpdated = await User.findOneAndUpdate(
          { _id: user.id },
          { password: passwordHashed },
          { new: true }
        )

        return {
          data: userAuthResponse(userUpdated),
          message: 'Your password has been reset successfully.'
        }
      } else {
        throw new Error('The code you entered is invalid. Please try again with valid code.')
      }
    } else {
      throw new Error(`The email ${email} is not registered. Please signup.`)
    }
  } catch (error) {
    throw new Error(params.common.message.error.server)
  }
}
