// Imports
import { GraphQLString, GraphQLList } from 'graphql'

// App Imports
import CandidateType from '../types'
import { getAll, get, getByOrganization, getByProject } from './resolvers'

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

// Get by organization
export const candidatesByOrganization = {
  type: new GraphQLList(CandidateType),
  resolve: getByOrganization
}

// Get by project
export const candidatesByProject = {
  type: new GraphQLList(CandidateType),
  args: {
    projectId: { type: GraphQLString }
  },
  resolve: getByProject
}
