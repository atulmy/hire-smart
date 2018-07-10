// Imports
import { GraphQLObjectType, GraphQLString } from 'graphql'

// App Imports
import OrganizationType from '../organization/types'
import ProjectType from '../project/types'
import { UserType } from '../user/types'

// Type
const JobType = new GraphQLObjectType({
  name: 'job',
  description: 'Job Type',

  fields: () => ({
    _id: { type: GraphQLString },
    organizationId: { type: OrganizationType },
    projectId: { type: ProjectType },
    userId: { type: UserType },
    role: { type: GraphQLString },
    description: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString }
  })
})

export default JobType
