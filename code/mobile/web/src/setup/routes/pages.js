// App Imports
import Home from '../../modules/pages/Home'
import Contact from '../../modules/pages/Contact'

// Pages routes
export default {
  pagesHome: {
    path: '/',
    component: Home,
    exact: true
  },

  pagesContact: {
    path: '/contact',
    component: Contact
  }
}
