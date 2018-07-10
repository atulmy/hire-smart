// Imports
import { GraphQLString } from 'graphql'

// App Imports
import JobType from '../types'
import { create, remove, update } from './resolvers'

// Job fields
const fields = {
  projectId: { type: GraphQLString },

  role: { type: GraphQLString },

  description: { type: GraphQLString }
}

// Job create
export const jobCreate = {
  type: JobType,
  args: fields,
  resolve: create
}

// Job update
export const jobUpdate = {
  type: JobType,
  args: {
    id: { type: GraphQLString },

    ...fields
  },
  resolve: update
}

// Job remove
export const jobRemove = {
  type: JobType,
  args: {
    id: { type: GraphQLString }
  },
  resolve: remove
}
