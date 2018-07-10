// Imports
import { GraphQLString, GraphQLList } from 'graphql'

// App Imports
import InterviewType from '../types'
import { get, getByOrganization, getByProject } from './resolvers'

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

// Get by project
export const interviewsByProject = {
  type: new GraphQLList(InterviewType),
  args: {
    projectId: { type: GraphQLString }
  },
  resolve: getByProject
}
