// App Imports
import Home from '../../modules/pages/Home'
import Contact from '../../modules/pages/Contact'
import Features from '../../modules/pages/Features'

// Pages routes
export default {
  home: {
    path: '/',
    component: Home,
    exact: true
  },
  contact: {
    path: '/contact',
    component: Contact
  },
  features: {
    path: '/features',
    component: Features
  }
}
