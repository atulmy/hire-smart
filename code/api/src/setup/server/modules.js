// App Imports
import user from '../../modules/user'
import organization from '../../modules/organization'
import project from '../../modules/project'
import activity from '../../modules/activity'
import candidate from '../../modules/candidate'
import interviewer from '../../modules/interviewer'
import job from '../../modules/job'
import kanban from '../../modules/kanban'

// Modules
export default {
  ...user,
  ...organization,
  ...project,
  ...activity,
  ...candidate,
  ...interviewer,
  ...job,
  ...kanban,
}
