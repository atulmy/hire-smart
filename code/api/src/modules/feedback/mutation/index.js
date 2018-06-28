// Imports
import { GraphQLString } from 'graphql'

// App Imports
import FeedbackType from '../types'
import { createOrUpdate } from './resolvers'

// Feedback fields
const fields = {
  interviewId: { type: GraphQLString },
  
  text: { type: GraphQLString },

  status: { type: GraphQLString }
}

// Feedback create
export const feedbackCreateOrUpdate = {
  type: FeedbackType,
  args: fields,
  resolve: createOrUpdate
}
