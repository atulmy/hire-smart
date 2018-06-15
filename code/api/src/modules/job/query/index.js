// Imports
import { GraphQLString, GraphQLList } from 'graphql'

// App Imports
import JobType from '../types'
import { getAll, get, getByUser, getByOrganization, getByClient } from './resolvers'

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

// Get by client
export const jobsByClient = {
  type: new GraphQLList(JobType),
  args: {
    clientId: { type: GraphQLString }
  },
  resolve: getByClient
}
