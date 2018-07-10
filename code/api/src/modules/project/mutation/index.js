// Imports
import { GraphQLString } from 'graphql'

// App Imports
import ProjectType from '../types'
import { create, remove, update } from './resolvers'

// Project fields
const fields = {
  name: { type: GraphQLString },

  description: { type: GraphQLString }
}

// Project create
export const projectCreate = {
  type: ProjectType,
  args: fields,
  resolve: create
}

// Project update
export const projectUpdate = {
  type: ProjectType,
  args: {
    id: { type: GraphQLString },

    ...fields
  },
  resolve: update
}

// Project remove
export const projectRemove = {
  type: ProjectType,
  args: {
    id: { type: GraphQLString }
  },
  resolve: remove
}
