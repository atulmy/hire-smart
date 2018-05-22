// Imports
import { GraphQLObjectType, GraphQLString } from 'graphql'

// Type
const OrganizationType = new GraphQLObjectType({
  name: 'organization',
  description: 'Organization Type',

  fields: () => ({
    _id: { type: GraphQLString },
    userId: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    domain: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString }
  })
})

export default OrganizationType
