// Imports
import { GraphQLObjectType, GraphQLString } from 'graphql'

// Type
const InterviewType = new GraphQLObjectType({
  name: 'interview',
  description: 'Interview Type',

  fields: () => ({
    _id: { type: GraphQLString },
    organizationId: { type: GraphQLString },
    clientId: { type: GraphQLString },
    candidateId: { type: GraphQLString },
    panelId: { type: GraphQLString },
    userId: { type: GraphQLString },
    dateTime: { type: GraphQLString },
    mode: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString }
  })
})

export default InterviewType
