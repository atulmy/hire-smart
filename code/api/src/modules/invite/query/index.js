// Imports
import { GraphQLList, GraphQLString } from 'graphql'

// App Imports
import InviteType from '../types'
import { get, getByOrganization } from './resolvers'

// Get by id
export const invite = {
  type: InviteType,
  args: {
    id: { type: GraphQLString }
  },
  resolve: get
}

// Get by organization
export const invitesByOrganization = {
  type: new GraphQLList(InviteType),
  resolve: getByOrganization
}
