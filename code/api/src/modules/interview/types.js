// Imports
import { GraphQLObjectType, GraphQLString } from 'graphql'

// App Imports
import OrganizationType from '../organization/types'
import ProjectType from '../project/types'
import CandidateType from '../candidate/types'
import InterviewerType from '../interviewer/types'
import FeedbackType from '../feedback/types'
import { UserType } from '../user/types'

// Type
const InterviewType = new GraphQLObjectType({
  name: 'interview',
  description: 'Interview Type',

  fields: () => ({
    _id: { type: GraphQLString },
    organizationId: { type: OrganizationType },
    projectId: { type: ProjectType },
    candidateId: { type: CandidateType },
    interviewerId: { type: InterviewerType },
    feedbackId: { type: FeedbackType },
    userId: { type: UserType },
    dateTime: { type: GraphQLString },
    mode: { type: GraphQLString },
    note: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString }
  })
})

export default InterviewType
