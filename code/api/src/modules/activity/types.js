// Imports
import { GraphQLObjectType, GraphQLString } from 'graphql'

// App Imports
import OrganizationType from '../organization/types'
import ProjectType from '../project/types'
import { UserType } from '../user/types'

// Type
const ActivityType = new GraphQLObjectType({
  name: 'activity',
  description: 'Activity Type',

  fields: () => ({
    _id: { type: GraphQLString },
    organizationId: { type: OrganizationType },
    projectId: { type: ProjectType },
    userId: { type: UserType },
    action: { type: GraphQLString },
    message: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString }
  })
})

export default ActivityType
