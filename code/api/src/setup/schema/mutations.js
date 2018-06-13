// Imports
import { GraphQLObjectType } from 'graphql'

// App Imports
import * as user from '../../modules/user/mutation'
import * as organization from '../../modules/organization/mutation'
import * as client from '../../modules/client/mutation'
import * as candidate from '../../modules/candidate/mutation'
import * as panel from '../../modules/panel/mutation'
import * as interview from '../../modules/interview/mutation'
import * as kanban from '../../modules/kanban/mutation'

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
    ...interview,
    ...kanban
  }
})

export default mutation
