// Imports
import { GraphQLString, GraphQLList } from 'graphql'

// App Imports
import FeedbackType from '../types'
import { get, getByInterview } from './resolvers'

// Get by id
export const feedback = {
  type: FeedbackType,
  args: {
    id: { type: GraphQLString }
  },
  resolve: get
}

// Get by organization
export const feedbacksByInterview = {
  type: new GraphQLList(FeedbackType),
  args: {
    interviewId: { type: GraphQLString }
  },
  resolve: getByInterview
}
