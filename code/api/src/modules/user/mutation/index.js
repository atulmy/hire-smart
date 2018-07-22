// Imports
import { GraphQLString } from 'graphql'

// App Imports
import { UserType, UserLoginType } from '../types'
import { startNow, verifySendCode, verifyCode, verifyUpdateAccount, acceptInvite, update } from './resolvers'

// Create a demo user and login
export const userStartNow = {
  type: UserLoginType,
  resolve: startNow
}


// Verify email send code
export const userVerifySendCode = {
  type: UserType,
  args: {
    email: { type: GraphQLString }
  },
  resolve: verifySendCode
}

// Verify code
export const userVerifyCode = {
  type: UserType,
  args: {
    email: { type: GraphQLString },
    code: { type: GraphQLString }
  },
  resolve: verifyCode
}

// Verify code
export const userVerifyUpdateAccount = {
  type: UserLoginType,
  args: {
    email: { type: GraphQLString },
    name: { type: GraphQLString },
    password: { type: GraphQLString },
    organizationName: { type: GraphQLString }
  },
  resolve: verifyUpdateAccount
}

// Invite to Organization
export const userInviteAccept = {
  type: UserLoginType,
  args: {
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    password: { type: GraphQLString }
  },
  resolve: acceptInvite
}

// Invite to Organization
export const userUpdate = {
  type: UserLoginType,
  args: {
    name: { type: GraphQLString }
  },
  resolve: update
}
