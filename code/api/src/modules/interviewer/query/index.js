// Imports
import { GraphQLString, GraphQLList } from 'graphql'

// App Imports
import InterviewerType from '../types'
import { getAll, get, getByUser, getByOrganization, getByClient } from './resolvers'

// Get all
export const interviewers = {
  type: new GraphQLList(InterviewerType),
  resolve: getAll
}

// Get by id
export const interviewer = {
  type: InterviewerType,
  args: {
    id: { type: GraphQLString }
  },
  resolve: get
}

// Get by user
export const interviewersByUser = {
  type: new GraphQLList(InterviewerType),
  resolve: getByUser
}

// Get by organization
export const interviewersByOrganization = {
  type: new GraphQLList(InterviewerType),
  resolve: getByOrganization
}

// Get by client
export const interviewersByClient = {
  type: new GraphQLList(InterviewerType),
  args: {
    clientId: { type: GraphQLString }
  },
  resolve: getByClient
}
