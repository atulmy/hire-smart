// App Imports
import Access from '../../modules/user/Access'
import Account from '../../modules/user/Account'

// Pages routes
export default {
  login: {
    path: '/login',
    component: Access
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
  }
}
