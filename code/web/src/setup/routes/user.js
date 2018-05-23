// App Imports
import Account from '../../modules/user/Account'
import Dashboard from '../../modules/user/Dashboard'

// Pages routes
export default {
  login: {
    path: '/login',
    component: Account
  },
  account: {
    path: '/account',
    component: Account,
    auth: true
  },
  dashboard: {
    path: '/dashboard',
    component: Dashboard,
    auth: true
  }
}
