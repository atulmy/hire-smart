// Imports
import { GraphQLObjectType, GraphQLString } from 'graphql'

// App Imports
import OrganizationType from '../organization/types'
import ProjectType from '../project/types'
import JobType from '../job/types'
import { UserType } from '../user/types'

// Type
const CandidateType = new GraphQLObjectType({
  name: 'candidate',
  description: 'Candidate Type',

  fields: () => ({
    _id: { type: GraphQLString },
    organizationId: { type: OrganizationType },
    projectId: { type: ProjectType },
    jobId: { type: JobType },
    userId: { type: UserType },
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
