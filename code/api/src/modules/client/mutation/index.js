// Imports
import { GraphQLString } from 'graphql'

// App Imports
import ClientType from '../types'
import { create, remove, update } from './resolvers'

// Client fields
const fields = {
  name: { type: GraphQLString },

  description: { type: GraphQLString }
}

// Client create
export const clientCreate = {
  type: ClientType,
  args: fields,
  resolve: create
}

// Client update
export const clientUpdate = {
  type: ClientType,
  args: {
    id: { type: GraphQLString },

    ...fields
  },
  resolve: update
}

// Client remove
export const clientRemove = {
  type: ClientType,
  args: {
    id: { type: GraphQLString }
  },
  resolve: remove
}
