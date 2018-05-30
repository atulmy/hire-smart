// App Imports
import Manage from '../../modules/client/Manage'

// Pages routes
export default {
  client: {
    path: '/clients',
    component: Manage,
    auth: true
  }
}
