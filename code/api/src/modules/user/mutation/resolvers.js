// Imports
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import React from 'react'

// App Imports
import { NODE_ENV } from '../../../setup/config/env'
import serverConfig from '../../../setup/config/server'
import params from '../../../setup/config/params'
import { randomNumber } from '../../../setup/helpers'
import DemoUser from '../../demo-user/model'
import Organization from '../../organization/model'
import Verification from '../../verification/model'
import User from '../model'
import { send as sendEmail } from '../../email/send'
import Invite from '../email/Invite'
import Verify from '../email/Verify'

// Create (Register)
export async function create(parentValue, { name, email, password }) {
  // Users exists with same email check
  const user = await User.findOne({ email })

  if (!user) {
    // User does not exists
    const passwordHashed = await bcrypt.hash(password, serverConfig.saltRounds)

    const organization = await Organization.create({
      name: 'Organization'
    })

    return await User.create({
      organizationId: organization._id,
      name,
      email,
      password: passwordHashed,
      demo: false
    })
  } else {
    // User exists
    throw new Error(`The email ${ email } is already registered. Please try to login.`)
  }
}

// Create a demo user and login
export async function startNow(parentValue, {}, { auth }) {
  // Check if user is already logged in
  if(!auth.user) {
    throw new Error(`You are already logged in. Please go to your dashboard to continue.`)
  } else {
    try {
      let user

      if(NODE_ENV === 'development1') {
        // Use already created user instead of creating new every time
        user = await User.findOne({ email: 'user@hiresmart.app' })
      } else {
        // Create new Organization
        const organization = await Organization.create({
          name: 'Demo Organization'
        })

        // Create a new demo user
        const demoUser = await DemoUser.create({})

        // User does not exists
        const passwordHashed = await bcrypt.hash(demoUser._id + Math.random(), serverConfig.saltRounds)

        user = await User.create({
          organizationId: organization._id,
          name: 'Demo User',
          email: `demo.user+${ demoUser._id }@${ params.site.domain }`,
          password: passwordHashed,
          demo: true
        })
      }

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

// Create invite to organization
export async function inviteToOrganization(parentValue, { name, email }, { auth }) {
  if(auth.user && auth.user.id) {
    // Users exists with same email check
    const user = await User.findOne({ email })

    if (!user) {
      // User does not exists
      const passwordHashed = await bcrypt.hash(name + email + Math.random(), serverConfig.saltRounds)

      // Send invite email
      const organization = await Organization.findOne({ _id: auth.user.organizationId })

      sendEmail({
        to: {
          name,
          email
        },
        from: auth.user,
        subject: 'You have been invited!',
        template:
          <Invite
            invitedTo={name}
            invitedBy={auth.user.name}
            organizationName={organization.name}
          />,
        organizationId: auth.user.organizationId,
        userId: auth.user.id
      })

      return await User.create({
        organizationId: auth.user.organizationId,
        name,
        email,
        password: passwordHashed,
        demo: false
      })
    } else {
      // User exists
      throw new Error(`The email ${ email } is already registered. Please ask the user to login.`)
    }
  } else {
    throw new Error('Please login to view invite team mate to your organization.')
  }
}

// Delete
export async function remove(parentValue, { id }) {
  return await User.remove({ _id: id })
}

// Verify email send code
export async function verifySendCode(parentValue, { email }, { auth }) {
  if(auth.user && auth.user.id && auth.user.demo) {

    let code

    const verification = await Verification.findOne({ userId: auth.user.id, email })

    if (verification) {
      // Use already generated code
      code = verification.code
    } else {
      // Generate new code
      code = randomNumber(1000, 9999)

      Verification.create({
        userId: auth.user.id,
        email,
        code,
        verified: false
      })
    }

    sendEmail({
      to: {
        name: auth.user.name,
        email
      },
      from: {
        name: params.site.emails.help.name,
        email: params.site.emails.help.email
      },
      subject: `Verification Code: ${ code }`,
      template:
        <Verify
          code={code}
          sender={params.site.name}
        />,
      organizationId: auth.user.organizationId,
      userId: auth.user.id
    })

    return {
      _id: auth.user.id
    }
  } else {
    throw new Error('You are not authorized to do this operation.')
  }
}

// Verify email send code
export async function verifyCode(parentValue, { code }, { auth }) {
  if(auth.user && auth.user.id && auth.user.demo) {

    const verification = await Verification.findOne({ userId: auth.user.id, code })

    if(verification) {
      // Mark as verified
      await Verification.updateOne(
        { _id: verification._id },
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
  } else {
    throw new Error('You are not authorized to do this operation.')
  }
}

// Verify update accountd details
export async function verifyUpdateAccount(parentValue, { name, password, organizationName }, { auth }) {
  if(auth.user && auth.user.id && auth.user.demo) {

    const verification = await Verification.findOne({ userId: auth.user.id })

    if(verification && verification.verified) {
      // Update user details
      const passwordHashed = await bcrypt.hash(password, serverConfig.saltRounds)

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
            name: organizationName
          }
        }
      )

      const user = await User.findOne({ _id: auth.user.id })

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
        token: jwt.sign(token, serverConfig.secret)
      }
    } else {
      throw new Error('The code you entered is invalid. Please try again with valid code.')
    }
  } else {
    throw new Error('You are not authorized to do this operation.')
  }
}
