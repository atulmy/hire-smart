// Imports
import { GraphQLString } from 'graphql'

// App Imports
import InterviewType from '../types'
import { create, remove, update, remind } from './resolvers'

// Interview fields
const fields = {
  clientId: {
    name: 'candidateId',
    type: GraphQLString
  },

  candidateId: {
    name: 'candidateId',
    type: GraphQLString
  },

  interviewerId: {
    name: 'interviewerId',
    type: GraphQLString
  },

  dateTime: {
    name: 'dateTime',
    type: GraphQLString
  },

  mode: {
    name: 'mode',
    type: GraphQLString
  },

  note: {
    name: 'note',
    type: GraphQLString
  }
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
    id: {
      name: 'id',
      type: GraphQLString
    },

    ...fields
  },
  resolve: update
}

// Interview remove
export const interviewRemove = {
  type: InterviewType,
  args: {
    id: {
      name: 'id',
      type: GraphQLString
    }
  },
  resolve: remove
}

// Interview remind
export const interviewRemind = {
  type: InterviewType,
  args: {
    id: {
      name: 'id',
      type: GraphQLString
    }
  },
  resolve: remind
}
