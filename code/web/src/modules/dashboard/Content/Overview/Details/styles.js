// UI Imports
import grey from '@material-ui/core/colors/grey'

// Component Styles
const styles = theme => ({
  title: {
    marginBottom: theme.spacing(3)
  },

  item: {
    marginBottom: theme.spacing(2.5),
    borderBottom: `1px solid ${ grey[200] }`
  },

  tabs: {
    backgroundColor: grey[50],
    borderBottom: `1px solid ${ grey[100] }`,
  },
  tabContent: {
    padding: theme.spacing(2),
  },

  interview: {
    border: `1px solid ${ grey[200] }`,
    marginBottom: theme.spacing(2)
  },
  interviewNumber: {
    backgroundColor: grey[200],
    padding: theme.spacing()
  },
  interviewContent: {
    padding: theme.spacing(2)
  },
  interviewContentActions: {
    textAlign: 'right'
  },

  action: {
    textAlign: 'right',
    paddingRight: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },

  clickToCopy: {
    cursor: 'pointer'
  }
})

export default styles
