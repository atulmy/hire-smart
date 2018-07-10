// Imports
import { GraphQLString, GraphQLList } from 'graphql'

// App Imports
import JobType from '../types'
import { getAll, get, getByUser, getByOrganization, getByProject } from './resolvers'

// Get all
export const jobs = {
  type: new GraphQLList(JobType),
  resolve: getAll
}

// Get by id
export const job = {
  type: JobType,
  args: {
    id: { type: GraphQLString }
  },
  resolve: get
}

// Get by project
export const jobsByProject = {
  type: new GraphQLList(JobType),
  args: {
    projectId: { type: GraphQLString }
  },
  resolve: getByProject
}
