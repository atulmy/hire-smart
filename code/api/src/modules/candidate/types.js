// Imports
import { GraphQLObjectType, GraphQLString } from 'graphql'

// Type
const CandidateType = new GraphQLObjectType({
  name: 'candidate',
  description: 'Candidate Type',

  fields: () => ({
    _id: { type: GraphQLString },
    organizationId: { type: GraphQLString },
    clientId: { type: GraphQLString },
    userId: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    mobile: { type: GraphQLString },
    experience: { type: GraphQLString },
    resume: { type: GraphQLString },
    salaryCurrent: { type: GraphQLString },
    salaryExpected: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString }
  })
})

export default CandidateType
