// Imports
import { GraphQLString, GraphQLList } from 'graphql'

// App Imports
import { UserType, UserLoginType } from '../types'
import { getAll, getById, login, getByOrganization } from './resolvers'

// All
export const users = {
  type: new GraphQLList(UserType),
  resolve: getAll
}

// All by organization
export const usersByOrganization = {
  type: new GraphQLList(UserType),
  resolve: getByOrganization
}

// By ID
export const user = {
  type: UserType,
  args: {
    id: { type: GraphQLString }
  },
  resolve: getById
}

// Auth
export const userLogin = {
  type: UserLoginType,
  args: {
    email: {
      name: 'email',
      type: GraphQLString
    },

    password: {
      name: 'password',
      type: GraphQLString
    }
  },
  resolve: login
}
