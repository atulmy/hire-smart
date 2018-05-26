// Imports
import { GraphQLString, GraphQLList } from 'graphql'

// App Imports
import OrganizationType from './types'
import { getAll, getByUser, get } from './resolvers'

// Get all
export const organizations = {
  type: new GraphQLList(OrganizationType),
  resolve: getAll
}

// Get by id
export const organization = {
  type: OrganizationType,
  args: {
    id: { type: GraphQLString }
  },
  resolve: get
}

// Get by user
export const organizationByUser = {
  type: OrganizationType,
  resolve: getByUser
}
