// UI Imports
import grey from '@material-ui/core/colors/grey'

// Component Styles
const styles = theme => ({
  toolbar: {
    backgroundColor: grey[50],
    borderBottom: `1px solid ${ grey[100] }`,
    minHeight: 50
  },

  title: {
    flex: 1,
    textTransform: 'uppercase',
    color: grey[700]
  },

  content: {
    padding: theme.spacing.unit * 3
  },

  divider: {
    padding: `${ theme.spacing.unit }px 0`
  },

  buttonsContainer: {
    textAlign: 'right',
    marginTop: theme.spacing.unit
  },

  panel: {
    backgroundColor: grey[50],
  }
})

export default styles
