// App Imports
import Manage from '../../modules/interviewer/Manage'

// Pages routes
export default {
  interviewer: {
    path: '/interviewer',
    component: Manage,
    auth: true
  }
}
