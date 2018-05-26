// Imports
import { GraphQLString } from 'graphql'

// App Imports
import OrganizationType from './types'
import { create, remove, update } from './resolvers'

// Organization create
export const organizationCreate = {
  type: OrganizationType,
  args: {
    name: {
      name: 'name',
      type: GraphQLString
    },

    description: {
      name: 'description',
      type: GraphQLString
    }
  },
  resolve: create
}

// Organization update
export const organizationUpdate = {
  type: OrganizationType,
  args: {
    id: {
      name: 'id',
      type: GraphQLString
    },

    name: {
      name: 'name',
      type: GraphQLString
    },

    description: {
      name: 'description',
      type: GraphQLString
    },

    domain: {
      name: 'description',
      type: GraphQLString
    }
  },
  resolve: update
}

// Organization remove
export const organizationRemove = {
  type: OrganizationType,
  args: {
    id: {
      name: 'id',
      type: GraphQLString
    }
  },
  resolve: remove
}
