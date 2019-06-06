// UI Imports
import grey from '@material-ui/core/colors/grey'

// Component Styles
const styles = theme => ({
  root: {
    paddingTop: '10vh',
  },

  container: {
    width: 500,
    margin: '0 auto'
  },

  heading: {
    padding: theme.spacing(2),
    backgroundColor: grey[200],
    borderBottom: `1px solid ${ grey[200] }`
  },

  tabs: {
    backgroundColor: grey[50],
    borderBottom: `1px solid ${ grey[100] }`,
  },

  tabsContent: {
    padding: theme.spacing(2),
  },

})

export default styles
