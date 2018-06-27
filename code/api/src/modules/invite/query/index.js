// Imports
import { GraphQLString } from 'graphql'

// App Imports
import InviteType from '../types'
import { get } from './resolvers'

// Get by id
export const invite = {
  type: InviteType,
  args: {
    id: { type: GraphQLString }
  },
  resolve: get
}
