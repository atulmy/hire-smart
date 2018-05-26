// UI Imports
import grey from '@material-ui/core/colors/grey'

// Component Styles
const styles = theme => ({
  root: {
    minHeight: 'calc(100vh - 100px)',
    flex: 1
  },

  tabs: {
    backgroundColor: grey[50],
    borderBottom: `1px solid ${ grey[100] }`,
  },

  tabContent: {
    padding: theme.spacing.unit * 3
  },

  messageIcon: {
    color: grey[400],
    height: 40,
    width: 40
  },
  messageText: {
    color: grey[400],
  }
})

export default styles
