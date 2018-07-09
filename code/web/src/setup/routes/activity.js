// App Imports
import Manage from '../../modules/activity/Manage'

// Pages routes
export default {
  activity: {
    path: '/activities',
    component: Manage,
    auth: true
  }
}
