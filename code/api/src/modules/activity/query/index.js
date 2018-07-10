// Imports
import { GraphQLString, GraphQLList } from 'graphql'

// App Imports
import ActivityType from '../types'
import { getByOrganization, getByProject } from './resolvers'

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
