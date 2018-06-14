// Imports
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// App Imports
import serverConfig from '../../../setup/config/server'
import { NODE_ENV, EMAIL_TEST } from '../../../setup/config/env'
import params from '../../../setup/config/params'
import transport from '../../../setup/server/email'
import invite from '../../../setup/server/views/emails/invite'
import DemoUser from '../../demo-user/model'
import Organization from '../../organization/model'
import User from '../model'

// Create (Register)
export async function create(parentValue, { name, email, password }) {
  // Users exists with same email check
  const user = await User.findOne({ email })

  if (!user) {
    // User does not exists
    const passwordHashed = await bcrypt.hash(password, serverConfig.saltRounds)

    return await User.create({
      name,
      email,
      password: passwordHashed
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
      let userDetails

      if(NODE_ENV === 'development') {
        // Use already created user instead of creating new every time
        userDetails = await User.findOne({email: 'user@hiresmart.app'})
      } else {
        // Create new Organization
        const organization = await Organization.create({
          name: 'Demo Organization'
        })

        // Create a new demo user
        const demoUser = await DemoUser.create({})

        // User does not exists
        const passwordHashed = await bcrypt.hash(demoUser._id + Math.random(), serverConfig.saltRounds)

        userDetails = await User.create({
          organizationId: organization._id,
          name: 'Demo User',
          email: `demo.user+${ demoUser._id }@${ params.site.domain }`,
          password: passwordHashed
        })
      }

      const token = {
        id: userDetails._id,
        organizationId: userDetails.organizationId,
        name: userDetails.name,
        email: userDetails.email,
        role: userDetails.role,
      }

      return {
        user: userDetails,
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
      if(transport) {
        transport.sendMail({
          from: `"${ auth.user.name }" <${ auth.user.email }>`,
          to: `"${ name }" <${ NODE_ENV === 'development' ? EMAIL_TEST : email }>`,
          subject: `${ params.site.name } - You have been invited!`,
          html: invite({
            invitedTo: name,
            invitedBy: auth.user.name
          })
        })
      }

      return await User.create({
        organizationId: auth.user.organizationId,
        name,
        email,
        password: passwordHashed
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
