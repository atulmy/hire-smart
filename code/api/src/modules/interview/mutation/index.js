// Imports
import { GraphQLString, GraphQLBoolean } from 'graphql'

// App Imports
import InterviewType from '../types'
import { create, remove, update, remind } from './resolvers'

// Interview fields
const fields = {
  clientId: { type: GraphQLString },

  candidateId: { type: GraphQLString },

  interviewerId: { type: GraphQLString },

  dateTime: { type: GraphQLString },

  mode: { type: GraphQLString },

  note: { type: GraphQLString },

  invite: { type: GraphQLBoolean }
}

// Interview create
export const interviewCreate = {
  type: InterviewType,
  args: fields,
  resolve: create
}

// Interview update
export const interviewUpdate = {
  type: InterviewType,
  args: {
    id: { type: GraphQLString },

    ...fields
  },
  resolve: update
}

// Interview remove
export const interviewRemove = {
  type: InterviewType,
  args: {
    id: { type: GraphQLString }
  },
  resolve: remove
}

// Interview remind
export const interviewRemind = {
  type: InterviewType,
  args: {
    id: { type: GraphQLString }
  },
  resolve: remind
}
