// App Imports
import pages from './pages'
import user from './user'
import organization from './organization'

// Combined routes
const routes = {
  ...pages,
  ...user,
  ...organization
}

export default routes
