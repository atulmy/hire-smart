// App Imports
import Account from '../../modules/user/Account'

// Pages routes
export default {
  login: {
    path: '/login',
    component: Account
  },
  account: {
    path: '/account',
    component: Account,
    auth: true,
    child: {
      demo: {
        path: '/account/demo'
      },
      subscriptions: {
        path: '/account/subscriptions'
      }
    }
  },
}
