// Imports
import { GraphQLString } from 'graphql'

// App Imports
import InterviewerType from '../types'
import { create, remove, update } from './resolvers'

// Interviewer fields
const fields = {
  clientId: { type: GraphQLString },

  name: { type: GraphQLString },

  email: { type: GraphQLString },

  mobile: { type: GraphQLString }
}

// Interviewer create
export const interviewerCreate = {
  type: InterviewerType,
  args: fields,
  resolve: create
}

// Interviewer update
export const interviewerUpdate = {
  type: InterviewerType,
  args: {
    id: { type: GraphQLString },

    ...fields
  },
  resolve: update
}

// Interviewer remove
export const interviewerRemove = {
  type: InterviewerType,
  args: {
    id: { type: GraphQLString }
  },
  resolve: remove
}
