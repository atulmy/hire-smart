// Imports
import { GraphQLObjectType, GraphQLString } from 'graphql'

// Type
const PanelType = new GraphQLObjectType({
  name: 'panel',
  description: 'Panel Type',

  fields: () => ({
    _id: { type: GraphQLString },
    organizationId: { type: GraphQLString },
    clientId: { type: GraphQLString },
    userId: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    mobile: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString }
  })
})

export default PanelType
