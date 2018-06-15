// App Imports
import pages from './pages'
import user from './user'
import dashboard from './dashboard'
import organization from './organization'
import client from './client'
import candidate from './candidate'
import interviewer from './interviewer'

// Combined routes
const routes = {
  ...pages,
  ...user,
  ...dashboard,
  ...organization,
  ...client,
  ...candidate,
  ...interviewer
}

export default routes
