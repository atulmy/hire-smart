// Imports
import { GraphQLObjectType } from 'graphql'

// App Imports
import * as user from '../../modules/user/query'
import * as organization from '../../modules/organization/query'
import * as project from '../../modules/project/query'
import * as job from '../../modules/job/query'
import * as candidate from '../../modules/candidate/query'
import * as interviewer from '../../modules/interviewer/query'
import * as interview from '../../modules/interview/query'
import * as kanban from '../../modules/kanban/query'
import * as invite from '../../modules/invite/query'
import * as feedback from '../../modules/feedback/query'
import * as activity from '../../modules/activity/query'

// Query
const query = new GraphQLObjectType({
  name: 'query',
  description: 'API Queries [Read]',

  fields: () => ({
    ...user,
    ...organization,
    ...project,
    ...job,
    ...candidate,
    ...interviewer,
    ...interview,
    ...kanban,
    ...invite,
    ...feedback,
    ...activity
  })
})

export default query
