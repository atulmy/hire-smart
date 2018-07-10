// Imports
import { GraphQLString } from 'graphql'

// App Imports
import CandidateType from '../types'
import { create, remove, update } from './resolvers'

// Candidate fields
const fields = {
  projectId: { type: GraphQLString },

  jobId: { type: GraphQLString },

  name: { type: GraphQLString },

  email: { type: GraphQLString },

  mobile: { type: GraphQLString },

  experience: { type: GraphQLString },

  resume: { type: GraphQLString },

  salaryCurrent: { type: GraphQLString },

  salaryExpected: { type: GraphQLString }
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
    id: { type: GraphQLString },

    ...fields
  },
  resolve: update
}

// Candidate remove
export const candidateRemove = {
  type: CandidateType,
  args: {
    id: { type: GraphQLString }
  },
  resolve: remove
}
