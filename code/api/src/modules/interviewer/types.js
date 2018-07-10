// Imports
import { GraphQLObjectType, GraphQLString } from 'graphql'

// App Imports
import OrganizationType from '../organization/types'
import ProjectType from '../project/types'
import { UserType } from '../user/types'

// Type
const InterviewerType = new GraphQLObjectType({
  name: 'interviewer',
  description: 'Interviewer Type',

  fields: () => ({
    _id: { type: GraphQLString },
    organizationId: { type: OrganizationType },
    projectId: { type: ProjectType },
    userId: { type: UserType },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    mobile: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString }
  })
})

export default InterviewerType
