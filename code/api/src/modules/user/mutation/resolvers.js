// Imports
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import React from 'react'

// App Imports
import serverConfig from '../../../setup/config/server'
import params from '../../../setup/config/params'
import { randomNumber } from '../../../setup/helpers'
import DemoUser from '../../demo-user/model'
import Organization from '../../organization/model'
import Verification from '../../verification/model'
import User from '../model'
import { send as sendEmail } from '../../email/send'
import Verify from '../email/Verify'
import AccountCreatedOrVerified from '../email/AccountCreatedOrVerified'
import Invite from '../../invite/model'

// Create a demo user and login
export async function startNow(parentValue, {}, { auth }) {
  // Check if user is already logged in
  if(!auth.user) {
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
      const passwordHashed = await bcrypt.hash(demoUser._id + Math.random(), serverConfig.saltRounds)

      const user = await User.create({
        organizationId: organization._id,
        name: 'Demo User',
        email: `demo.user+${ demoUser._id }@${ params.site.domain }`,
        password: passwordHashed,
        admin: true,
        demo: true
      })

      const token = {
        id: user._id,
        organizationId: user.organizationId,
        name: user.name,
        email: user.email,
        role: user.role,
        demo: true
      }

      return {
        user,
        token: jwt.sign(token, serverConfig.secret)
      }
    } catch(error) {
      throw new Error(`There was some error. Please try again.`)
    }
  }
}

// Verify email send code
export async function verifySendCode(parentValue, { email }, { auth }) {
  const user = await User.findOne({ email })

  if(user) {
    // User already exists
    throw new Error(`The email ${ email } is already registered. Please try to login.`)
  } else {
    let code

    if(auth.user && auth.user.id && auth.user.demo) {
      const verification = await Verification.findOne({ userId: auth.user.id, email })

      if(verification) {
        code = verification.code
      }
    }

    if(!code) {
      code = randomNumber(1000, 9999)

      Verification.create({
        email,
        code,
        verified: false
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
      _id: null
    }
  }
}

// Verify email send code
export async function verifyCode(parentValue, { email, code }, { auth }) {
  const verification = await Verification.findOne({ email, code })

  if(verification) {
    // Mark as verified
    await Verification.updateOne(
      {_id: verification._id},
      {
        $set: { verified: true }
      }
    )

    return {
      _id: auth.user.id
    }
  } else {
    throw new Error('The code you entered is invalid. Please try again with valid code.')
  }
}

// Verify create/update user account
export async function verifyUpdateAccount(parentValue, { email, name, password, organizationName }, { auth }) {
  const verification = await Verification.findOne({ email, verified: true })

  const userCheck = await User.findOne({ email: verification.email })

  if(!userCheck) {
    if (verification && verification.verified) {
      let user
      let message

      const passwordHashed = await bcrypt.hash(password, serverConfig.saltRounds)
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

      const token = {
        id: user._id,
        organizationId: user.organizationId,
        name: user.name,
        email: user.email,
        role: user.role,
        demo: user.demo
      }

      return {
        user: user,
        token: jwt.sign(token, serverConfig.secret),
        message
      }
    } else {
      throw new Error('The code you entered is invalid. Please try again with valid code.')
    }
  } else {
    throw new Error(`The email ${ verification.email } is already registered. Please try to login.`)
  }
}

// Accept invitation
export async function acceptInvite(parentValue, { id, name, password }) {
  // Users exists with same email check
  const invite = await Invite.findOne({ _id: id, accepted: false })

  if (invite) {
    const passwordHashed = await bcrypt.hash(password, serverConfig.saltRounds)

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

    const token = {
      id: user._id,
      organizationId: user.organizationId,
      name: user.name,
      email: user.email,
      role: user.role,
      demo: user.demo
    }

    return {
      user: user,
      token: jwt.sign(token, serverConfig.secret),
      message: `Invitation accepted successfully. Welcome ${ name }!`
    }
  } else {
    // User exists
    throw new Error(`Sorry, this invitation is not valid anymore.`)
  }
}
