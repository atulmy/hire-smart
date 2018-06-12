// Imports
import { GraphQLObjectType, GraphQLString } from 'graphql'

// App Imports
import OrganizationType from '../organization/types'
import ClientType from '../client/types'
import { UserType } from '../user/types'

// Type
const PanelType = new GraphQLObjectType({
  name: 'panel',
  description: 'Panel Type',

  fields: () => ({
    _id: { type: GraphQLString },
    organizationId: { type: OrganizationType },
    clientId: { type: ClientType },
    userId: { type: UserType },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    mobile: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString }
  })
})

export default PanelType
