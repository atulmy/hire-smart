// Imports
import { GraphQLObjectType } from 'graphql'

// App Imports
import * as user from '../../modules/user/mutations'
import * as organization from '../../modules/organization/mutations'
import * as client from '../../modules/client/mutations'
import * as candidate from '../../modules/candidate/mutations'
import * as panel from '../../modules/panel/mutations'
import * as interview from '../../modules/interview/mutations'

// Mutation
const mutation = new GraphQLObjectType({
  name: 'mutations',
  description: 'API Mutations [Create, Update, Delete]',

  fields: {
    ...user,
    ...organization,
    ...client,
    ...candidate,
    ...panel,
    ...interview
  }
})

export default mutation
