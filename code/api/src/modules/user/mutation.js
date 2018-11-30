// Imports
import bcrypt from 'bcrypt'
import React from 'react'
import isEmpty from 'lodash/isEmpty'
import jwt from 'jsonwebtoken'

// App Imports
import { SECURITY_SECRET, SECURITY_SALT_ROUNDS } from '../../setup/config/env'
import params from '../../setup/config/params'
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

// Create a demo user and login
export async function userStartNow({ auth, translate }) {
  // Check if user is already logged in
  if(authCheck(auth)) {
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
        email: `demo.user+${ demoUser._id }@${ params.site.domain }`,
        password: passwordHashed,
        admin: true,
        demo: true
      })

      // Log activity - Organization Created
      if(user) {
        await Activity.create({
          organizationId: organization._id,
          userId: user._id,
          action: params.activity.types.create,
          message: `Your organization was created.`
        })
      }

      return {
        data: userAuthResponse(user),
        message: translate.t('user.login.messages.success')
      }
    } catch(error) {
      throw new Error(`There was some error. Please try again.`)
    }
  }
}

// Verify email send code
export async function userVerifySendCode({ params: { email }, auth, translate }) {
  const user = await User.findOne({ email })

  if(user) {
    // User already exists
    throw new Error(`The email ${ email } is already registered. Please try to login.`)
  } else {
    let code

    if(authCheck(auth) && auth.user.demo) {
      const verification = await Verification.findOne({ userId: auth.user.id, email, verified: false, type: params.user.verification.signup })

      if(verification) {
        code = verification.code
      }
    }

    if(!code) {
      code = randomNumber(1000, 9999)

      await Verification.create({
        email,
        code,
        verified: false,
        type: params.user.verification.signup
      })
    }

    sendEmail({
      to: {
        email: email
      },
      from: {
        name: params.site.emails.help.name,
        email: params.site.emails.help.email
      },
      subject: `Verification Code: ${ code }`,
      template:
        <Verify
          code={code}
        />
    })

    return {
      data: true
    }
  }
}

// Verify email send code
export async function userVerifyCode({ params: { email, code } }) {
  const verification = await Verification.findOne({ email, code, verified: false, type: params.user.verification.signup })

  if(verification) {
    // Mark as verified
    await Verification.updateOne(
      {_id: verification._id},
      { verified: true }
    )

    return {
      data: true
    }
  } else {
    throw new Error('The code you entered is invalid. Please try again with valid code.')
  }
}

// Verify create/update user account
export async function userVerifyUpdateAccount({ params: { email, name, password, organizationName }, auth, translate }) {
  const verification = await Verification.findOne({ email, verified: true, type: params.user.verification.signup })

  console.log(verification)

  const userCheck = await User.findOne({ email: verification.email })

  if(!userCheck) {
    if (verification && verification.verified) {
      let user
      let message

      const passwordHashed = await bcrypt.hash(password, SECURITY_SALT_ROUNDS)
      const organizationDomain = email.split('@')[1]

      if(auth.user && auth.user.id && auth.user.demo) {
        // Update user
        await User.updateOne(
          { _id: auth.user.id },
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
          userId: auth.user.id,
          action: params.activity.types.create,
          message: `${ name } (${ email }) joined the organization.`
        })

        user = await User.findOne({ _id: auth.user.id })

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

      sendEmail({
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
    throw new Error(`The email ${ verification.email } is already registered. Please try to login.`)
  }
}

// Accept invitation
export async function userAcceptInvite(parentValue, { id, name, password }) {
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
    sendEmail({
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
    if(invite) {
      await Activity.create({
        organizationId: invite.organizationId,
        userId: user._id,
        inviteId: invite._id,
        action: params.activity.types.create,
        message: `${ name } (${ invite.email }) joined the organization.`
      })
    }

    return {
      data: userAuthResponse(user),
      message: `Invitation accepted successfully. Welcome ${ name }!`
    }
  } else {
    // User exists
    throw new Error(`Sorry, this invitation is not valid anymore.`)
  }
}

// Update
export async function userUpdate({ params: { name }, auth }) {
  if(authCheck(auth)) {
    if(!isEmpty(name)) {
      await User.updateOne({ _id: auth.user._id }, { name })

      const user = await User.findOne({ _id: auth.user._id })

      return {
        data: userAuthResponse(user),
        message: 'Your profile has been updated successfully.'
      }
    } else {
      throw new Error('Please enter valid name.')
    }
  }

  throw new Error('Please login to update profile.')
}

// Reset password send code
export async function userResetPasswordSendCode({ params: { email } }) {
  const user = await User.findOne({ email })

  if(user) {
    let code

    const verification = await Verification.findOne({ email, verified: false, type: params.user.verification.password })

    if(verification) {
      code = verification.code
    }

    if(!code) {
      code = randomNumber(1000, 9999)

      Verification.create({
        userId: user._id,
        email,
        code,
        verified: false,
        type: params.user.verification.password
      })
    }

    sendEmail({
      to: {
        email: email
      },
      from: {
        name: params.site.emails.help.name,
        email: params.site.emails.help.email
      },
      subject: `Verification Code: ${ code }`,
      template:
        <Verify
          code={code}
        />
    })

    return {
      data: true
    }
  } else {
    throw new Error(`The email ${ email } is not registered. Please signup.`)
  }
}

// Verify email send code
export async function userResetPasswordVerifyCode({ params: { email, code } }) {
  const verification = await Verification.findOne({ email, code, verified: false, type: params.user.verification.password })

  if(verification) {
    // Mark as verified
    await Verification.updateOne(
      {_id: verification._id},
      { verified: true }
    )

    return {
      data: true
    }
  } else {
    throw new Error('The code you entered is invalid. Please try again with valid code.')
  }
}

// Reset password update
export async function userResetPasswordUpdate({ params: { email, password } }) {
  const verification = await Verification.findOne({ email, verified: true, type: params.user.verification.password })

  const user = await User.findOne({ email: verification.email })

  if(user) {
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
    throw new Error(`The email ${ email } is not registered. Please signup.`)
  }
}
