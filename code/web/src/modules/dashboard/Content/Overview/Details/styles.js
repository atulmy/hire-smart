// UI Imports
import grey from '@material-ui/core/colors/grey'

// Component Styles
const styles = theme => ({
  root: {
    minWidth: 400
  },

  title: {
    marginBottom: theme.spacing.unit * 3,
  },

  item: {
    marginBottom: theme.spacing.unit * 2.5,
    borderBottom: `1px solid ${ grey[200] }`
  },

  tabs: {
    backgroundColor: grey[50],
    borderBottom: `1px solid ${ grey[100] }`,
  },
  tabContent: {
    padding: theme.spacing.unit * 2,
  },

  interview: {
    paddingBottom: theme.spacing.unit * 2,
  },
  interviewTitle: {
    paddingBottom: theme.spacing.unit * 2,
  },

  action: {
    textAlign: 'right',
    paddingRight: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  }
})

export default styles
