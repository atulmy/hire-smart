// UI Imports
import grey from '@material-ui/core/colors/grey'

// Component Styles
const styles = theme => ({
  root: {
    padding: theme.spacing.unit,
    backgroundColor: grey[500]
  },

  buttonsContainer: {
    textAlign: 'right',
    marginTop: theme.spacing.unit
  },

  formContainer: {
    padding: theme.spacing.unit * 2
  },

  buttonUpload: {
    marginTop: theme.spacing.unit * 2.5
  }
})

export default styles
