// App Imports
import Manage from '../../modules/candidate/Manage'

// Pages routes
export default {
  candidate: {
    path: '/candidates',
    component: Manage,
    auth: true
  }
}
