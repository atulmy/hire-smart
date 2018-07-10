// Imports
import { GraphQLString, GraphQLList } from 'graphql'

// App Imports
import ProjectType from '../types'
import { getAll, get, getByOrganization } from './resolvers'

// Get all
export const projects = {
  type: new GraphQLList(ProjectType),
  resolve: getAll
}

// Get by id
export const project = {
  type: ProjectType,
  args: {
    id: { type: GraphQLString }
  },
  resolve: get
}

// Get by organization
export const projectsByOrganization = {
  type: new GraphQLList(ProjectType),
  resolve: getByOrganization
}
