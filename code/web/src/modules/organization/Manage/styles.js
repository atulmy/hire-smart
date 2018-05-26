// UI Imports
import grey from '@material-ui/core/colors/grey'

// Component Styles
const styles = theme => ({
  toolbar: {
    backgroundColor: grey[200],
    minHeight: 50
  },

  toolbarSecondary: {
    backgroundColor: grey[50],
    borderBottom: `1px solid ${ grey[100] }`,
    minHeight: 50
  },

  title: {
    flex: 1,
    textTransform: 'uppercase'
  },

  tabContent: {
    padding: theme.spacing.unit * 3
  },
})

export default styles
