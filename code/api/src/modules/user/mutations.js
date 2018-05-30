// Imports
import { GraphQLString } from 'graphql'

// App Imports
import { UserType, UserLoginType } from './types'
import { create, remove, startNow, inviteToOrganization } from './resolvers'

// Create a demo user and login
export const userStartNow = {
  type: UserLoginType,
  resolve: startNow
}

// Create
export const userSignup = {
  type: UserType,
  args: {
    name: {
      name: 'name',
      type: GraphQLString
    },

    email: {
      name: 'email',
      type: GraphQLString
    },

    password: {
      name: 'password',
      type: GraphQLString
    }
  },
  resolve: create
}

// Remove
export const userRemove = {
  type: UserType,
  args: {
    id: {
      name: 'id',
      type: GraphQLString
    }
  },
  resolve: remove
}

// Remove
export const userInviteToOrganization = {
  type: UserType,
  args: {
    name: {
      name: 'name',
      type: GraphQLString
    },
    email: {
      name: 'email',
      type: GraphQLString
    }
  },
  resolve: inviteToOrganization
}
