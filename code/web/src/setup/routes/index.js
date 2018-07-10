// App Imports
import pages from './pages'
import user from './user'
import dashboard from './dashboard'
import organization from './organization'
import project from './project'
import candidate from './candidate'
import interviewer from './interviewer'
import invite from './invite'
import feedback from './feedback'
import activity from './activity'

// Combined routes
const routes = {
  ...pages,
  ...user,
  ...dashboard,
  ...organization,
  ...project,
  ...candidate,
  ...interviewer,
  ...invite,
  ...feedback,
  ...activity
}

export default routes
