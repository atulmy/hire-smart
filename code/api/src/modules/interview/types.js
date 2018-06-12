// Imports
import { GraphQLObjectType, GraphQLString } from 'graphql'

// App Imports
import OrganizationType from '../organization/types'
import ClientType from '../client/types'
import CandidateType from '../candidate/types'
import PanelType from '../panel/types'
import { UserType } from '../user/types'

// Type
const InterviewType = new GraphQLObjectType({
  name: 'interview',
  description: 'Interview Type',

  fields: () => ({
    _id: { type: GraphQLString },
    organizationId: { type: OrganizationType },
    clientId: { type: ClientType },
    candidateId: { type: CandidateType },
    panelId: { type: PanelType },
    userId: { type: UserType },
    dateTime: { type: GraphQLString },
    mode: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString }
  })
})

export default InterviewType
