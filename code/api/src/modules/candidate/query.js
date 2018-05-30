// Imports
import { GraphQLString, GraphQLList } from 'graphql'

// App Imports
import CandidateType from './types'
import { getAll, get, getByUser, getByOrganization, getByClient } from './resolvers'

// Get all
export const candidates = {
  type: new GraphQLList(CandidateType),
  resolve: getAll
}

// Get by id
export const candidate = {
  type: CandidateType,
  args: {
    id: { type: GraphQLString }
  },
  resolve: get
}

// Get by user
export const candidatesByUser = {
  type: new GraphQLList(CandidateType),
  resolve: getByUser
}

// Get by organization
export const candidatesByOrganization = {
  type: new GraphQLList(CandidateType),
  resolve: getByOrganization
}

// Get by client
export const candidatesByClient = {
  type: new GraphQLList(CandidateType),
  args: {
    clientId: { type: GraphQLString }
  },
  resolve: getByClient
}
