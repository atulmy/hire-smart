// App Imports
import Login from '../../modules/user/Login'
import Profile from '../../modules/user/Profile'
import Dashboard from '../../modules/user/Dashboard'

// Pages routes
export default {
  userLogin: {
    path: '/user/login',
    component: Login
  },

  userProfile: {
    path: '/user/profile',
    component: Profile,
    auth: true
  },

  userDashboard: {
    path: '/user/dashboard',
    component: Dashboard,
    auth: true
  }
}
