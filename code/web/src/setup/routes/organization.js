// App Imports
import Manage from '../../modules/organization/Manage'

// Pages routes
export default {
  organization: {
    path: '/organization',
    component: Manage,
    auth: true
  }
}
