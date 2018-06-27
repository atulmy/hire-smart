// Imports
import { GraphQLObjectType, GraphQLString, GraphQLBoolean } from 'graphql'

// App Imports
import OrganizationType from '../organization/types'
import { UserType } from '../user/types'

// Type
const InviteType = new GraphQLObjectType({
  name: 'invite',
  description: 'Invite Type',

  fields: () => ({
    _id: { type: GraphQLString },
    organizationId: { type: OrganizationType },
    userId: { type: UserType },
    email: { type: GraphQLString },
    name: { type: GraphQLString },
    accepted: { type: GraphQLBoolean },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString }
  })
})

export default InviteType
