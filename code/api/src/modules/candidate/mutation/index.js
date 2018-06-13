// Imports
import { GraphQLString } from 'graphql'

// App Imports
import CandidateType from '../types'
import { create, remove, update } from './resolvers'

// Candidate fields
const fields = {
  clientId: {
    name: 'clientId',
    type: GraphQLString
  },

  name: {
    name: 'name',
    type: GraphQLString
  },

  email: {
    name: 'email',
    type: GraphQLString
  },

  mobile: {
    name: 'mobile',
    type: GraphQLString
  },

  experience: {
    name: 'email',
    type: GraphQLString
  },

  resume: {
    name: 'resume',
    type: GraphQLString
  },

  salaryCurrent: {
    name: 'salaryCurrent',
    type: GraphQLString
  },

  salaryExpected: {
    name: 'salaryExpected',
    type: GraphQLString
  }
}

// Candidate create
export const candidateCreate = {
  type: CandidateType,
  args: fields,
  resolve: create
}

// Candidate update
export const candidateUpdate = {
  type: CandidateType,
  args: {
    id: {
      name: 'id',
      type: GraphQLString
    },

    ...fields
  },
  resolve: update
}

// Candidate remove
export const candidateRemove = {
  type: CandidateType,
  args: {
    id: {
      name: 'id',
      type: GraphQLString
    }
  },
  resolve: remove
}
