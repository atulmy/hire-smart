// Imports
import { GraphQLString } from 'graphql'

// App Imports
import OrganizationType from '../types'
import { create, remove, update } from './resolvers'

const fields = {
  name: {
    name: 'name',
    type: GraphQLString
  },

  description: {
    name: 'description',
    type: GraphQLString
  },

  domain: {
    name: 'domain',
    type: GraphQLString
  }
}

// Organization create
export const organizationCreate = {
  type: OrganizationType,
  args: fields,
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

    ...fields
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
