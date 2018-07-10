// Imports
import { GraphQLString, GraphQLList } from 'graphql'

// App Imports
import InterviewerType from '../types'
import { getAll, get, getByOrganization, getByProject } from './resolvers'

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

// Get by organization
export const interviewersByOrganization = {
  type: new GraphQLList(InterviewerType),
  resolve: getByOrganization
}

// Get by project
export const interviewersByProject = {
  type: new GraphQLList(InterviewerType),
  args: {
    projectId: { type: GraphQLString }
  },
  resolve: getByProject
}
