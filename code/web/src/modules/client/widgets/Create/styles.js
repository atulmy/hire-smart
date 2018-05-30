// UI Imports
import grey from '@material-ui/core/colors/grey'

// Component Styles
const styles = theme => ({
  root: {
    flex: 1,
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingRight: theme.spacing.unit * 3,
    paddingLeft: theme.spacing.unit * 3
  },

  buttonsContainer: {
    textAlign: 'right',
    marginTop: theme.spacing.unit
  },

  buttonAdd: {
    color: grey[500]
  }
})

export default styles
