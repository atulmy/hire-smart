// Imports
import { GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql'

// App Imports
import OrganizationType from '../organization/types'
import ProjectType from '../project/types'
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
    projectId: { type: ProjectType },
    candidateId: { type: CandidateType },
    interviews: { type: GraphQLList(InterviewType) },
    userId: { type: UserType },
    status: { type: GraphQLString },
    highlight: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString }
  })
})

export default KanbanType
