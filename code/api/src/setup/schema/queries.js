// Imports
import { GraphQLObjectType } from 'graphql'

// App Imports
import * as user from '../../modules/user/query'
import * as organization from '../../modules/organization/query'
import * as client from '../../modules/client/query'
import * as candidate from '../../modules/candidate/query'
import * as panel from '../../modules/panel/query'
import * as interview from '../../modules/interview/query'

// Query
const query = new GraphQLObjectType({
  name: 'query',
  description: 'API Queries [Read]',

  fields: () => ({
    ...user,
    ...organization,
    ...client,
    ...candidate,
    ...panel,
    ...interview
  })
})

export default query
