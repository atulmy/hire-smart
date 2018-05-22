// UI Imports
import grey from '@material-ui/core/colors/grey'

// Component Styles
const styles = theme => ({
  root: {
    minHeight: 'calc(100vh - 99px)',
    display: 'flex'
  },

  sidebar: {
    height: 'calc(100vh - 99px)',
    width: 250,
    backgroundColor: grey[100],
    borderRight: `1px solid ${ grey[200] }`,
    overflowY: 'auto'
  },

  content: {
    minHeight: 'calc(100vh - 99px)',
    flex: 1
  },
  contentInner: {
    padding: theme.spacing.unit * 3
  },

  tabsContainer: {
    backgroundColor: grey[50],
    borderBottom: `1px solid ${ grey[100] }`,
  }
})

export default styles
