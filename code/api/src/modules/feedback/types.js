// Imports
import { GraphQLObjectType, GraphQLString } from 'graphql'

// App Imports
import OrganizationType from '../organization/types'
import InterviewType from '../interview/types'

// Type
const FeedbackType = new GraphQLObjectType({
  name: 'feedback',
  description: 'Feedback Type',

  fields: () => ({
    _id: { type: GraphQLString },
    organizationId: { type: OrganizationType },
    interviewId: { type: InterviewType },
    text: { type: GraphQLString },
    status: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString }
  })
})

export default FeedbackType
