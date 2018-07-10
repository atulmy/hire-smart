// Imports
import { GraphQLObjectType } from 'graphql'

// App Imports
import * as user from '../../modules/user/mutation'
import * as organization from '../../modules/organization/mutation'
import * as project from '../../modules/project/mutation'
import * as job from '../../modules/job/mutation'
import * as candidate from '../../modules/candidate/mutation'
import * as interviewer from '../../modules/interviewer/mutation'
import * as interview from '../../modules/interview/mutation'
import * as kanban from '../../modules/kanban/mutation'
import * as invite from '../../modules/invite/mutation'
import * as feedback from '../../modules/feedback/mutation'

// Mutation
const mutation = new GraphQLObjectType({
  name: 'mutations',
  description: 'API Mutations [Create, Update, Delete]',

  fields: {
    ...user,
    ...organization,
    ...project,
    ...job,
    ...candidate,
    ...interviewer,
    ...interview,
    ...kanban,
    ...invite,
    ...feedback
  }
})

export default mutation
