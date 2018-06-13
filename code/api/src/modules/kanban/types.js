// Imports
import { GraphQLObjectType, GraphQLString } from 'graphql'

// App Imports
import OrganizationType from '../organization/types'
import ClientType from '../client/types'
import CandidateType from '../candidate/types'
import InterviewType from '../interview/types'
import { UserType } from '../user/types'

// Type
const KanbanType = new GraphQLObjectType({
  name: 'kanban',
  description: 'Kanban Type',

  fields: () => ({
    _id: { type: GraphQLString },
    organizationId: { type: OrganizationType },
    clientId: { type: ClientType },
    candidateId: { type: CandidateType },
    interviewId: { type: InterviewType },
    userId: { type: UserType },
    status: { type: GraphQLString },
    highlight: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString }
  })
})

export default KanbanType
