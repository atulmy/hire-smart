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
    border: `1px solid ${ grey[200] }`,
    marginBottom: theme.spacing.unit * 2
  },
  interviewNumber: {
    backgroundColor: grey[200],
    padding: theme.spacing.unit
  },
  interviewContent: {
    padding: theme.spacing.unit * 2
  },

  action: {
    textAlign: 'right',
    paddingRight: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  },

  clickToCopy: {
    cursor: 'pointer'
  }
})

export default styles
