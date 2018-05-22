// Imports
import { GraphQLObjectType, GraphQLString } from 'graphql'

// Type
const ClientType = new GraphQLObjectType({
  name: 'client',
  description: 'Client Type',

  fields: () => ({
    _id: { type: GraphQLString },
    organizationId: { type: GraphQLString },
    userId: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString }
  })
})

export default ClientType
