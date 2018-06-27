// Imports
import { GraphQLString } from 'graphql'

// App Imports
import InviteType from '../types'
import { invite } from './resolvers'

// Invite to Organization
export const inviteToOrganization = {
  type: InviteType,
  args: {
    name: { type: GraphQLString },
    email: { type: GraphQLString }
  },
  resolve: invite
}
