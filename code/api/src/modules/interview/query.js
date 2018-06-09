// Imports
import { GraphQLString, GraphQLList } from 'graphql'

// App Imports
import InterviewType from './types'
import { getAll, get, getByUser, getByOrganization, getByClient } from './resolvers'

// Get all
export const interviews = {
  type: new GraphQLList(InterviewType),
  resolve: getAll
}

// Get by id
export const interview = {
  type: InterviewType,
  args: {
    id: { type: GraphQLString }
  },
  resolve: get
}

// Get by user
export const interviewsByUser = {
  type: new GraphQLList(InterviewType),
  resolve: getByUser
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
