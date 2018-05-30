// App Imports
import pages from './pages'
import user from './user'
import organization from './organization'
import client from './client'
import candidate from './candidate'
import panel from './panel'

// Combined routes
const routes = {
  ...pages,
  ...user,
  ...organization,
  ...client,
  ...candidate,
  ...panel
}

export default routes
