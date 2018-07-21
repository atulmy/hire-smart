// Imports
import { GraphQLString, GraphQLList } from 'graphql'

// App Imports
import ActivityType from '../types'
import { getByOrganization, getByProject, getByCandidate } from './resolvers'

// Get by project
export const activitiesByOrganization = {
  type: new GraphQLList(ActivityType),
  args: {
    organizationId: { type: GraphQLString }
  },
  resolve: getByOrganization
}

// Get by project
export const activitiesByProject = {
  type: new GraphQLList(ActivityType),
  args: {
    projectId: { type: GraphQLString }
  },
  resolve: getByProject
}

// Get by candidate
export const activitiesByCandidate = {
  type: new GraphQLList(ActivityType),
  args: {
    candidateId: { type: GraphQLString }
  },
  resolve: getByCandidate
}
