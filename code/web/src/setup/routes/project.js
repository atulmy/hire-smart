// App Imports
import Manage from '../../modules/project/Manage'

// Pages routes
export default {
  project: {
    path: '/projects',
    component: Manage,
    auth: true
  }
}
