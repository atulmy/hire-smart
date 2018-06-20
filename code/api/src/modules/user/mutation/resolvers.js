// Imports
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import React from 'react'

// App Imports
import { NODE_ENV } from '../../../setup/config/env'
import serverConfig from '../../../setup/config/server'
import params from '../../../setup/config/params'
import DemoUser from '../../demo-user/model'
import Organization from '../../organization/model'
import User from '../model'
import { send as sendEmail } from '../../email/send'
import Invite from '../email/Invite'

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
