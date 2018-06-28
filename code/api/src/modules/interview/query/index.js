// Imports
import { GraphQLString, GraphQLList } from 'graphql'

// App Imports
import InterviewType from '../types'
import { get, getByOrganization, getByClient } from './resolvers'

// Get by id
export const interview = {
  type: InterviewType,
  args: {
    id: { type: GraphQLString }
  },
  resolve: get
}

// Get by organization
export const interviewsByOrganization = {
  type: new GraphQLList(InterviewType),
  resolve: getByOrganization
}

// Get by client
export const interviewsByClient = {
  type: new GraphQLList(InterviewType),
  args: {
    clientId: { type: GraphQLString }
  },
  resolve: getByClient
}
