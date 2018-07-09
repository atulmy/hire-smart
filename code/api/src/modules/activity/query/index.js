// Imports
import { GraphQLString, GraphQLList } from 'graphql'

// App Imports
import ActivityType from '../types'
import { getByOrganization, getByClient } from './resolvers'

// Get by client
export const activitiesByOrganization = {
  type: new GraphQLList(ActivityType),
  args: {
    organizationId: { type: GraphQLString }
  },
  resolve: getByOrganization
}

// Get by client
export const activitiesByClient = {
  type: new GraphQLList(ActivityType),
  args: {
    clientId: { type: GraphQLString }
  },
  resolve: getByClient
}
