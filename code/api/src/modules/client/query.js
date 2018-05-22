// Imports
import { GraphQLString, GraphQLList } from 'graphql'

// App Imports
import ClientType from './types'
import { getAll, get, getByUser, getByOrganization } from './resolvers'

// Get all
export const clients = {
  type: new GraphQLList(ClientType),
  resolve: getAll
}

// Get by id
export const client = {
  type: ClientType,
  args: {
    id: { type: GraphQLString }
  },
  resolve: get
}

// Get by user
export const clientsByUser = {
  type: new GraphQLList(ClientType),
  resolve: getByUser
}

// Get by organization
export const clientsByOrganization = {
  type: new GraphQLList(ClientType),
  resolve: getByOrganization
}
