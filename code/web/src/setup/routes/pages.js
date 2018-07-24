// App Imports
import Home from '../../modules/pages/Home'
import Contact from '../../modules/pages/Contact'
import Features from '../../modules/pages/Features'
import Privacy from '../../modules/pages/Privacy'

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
  },
  privacy: {
    path: '/privacy',
    component: Privacy
  }
}
