// UI Imports
import grey from '@material-ui/core/colors/grey'

// Component Styles
const styles = theme => ({
  root: {
    padding: theme.spacing(),
    backgroundColor: grey[500]
  },

  buttonsContainer: {
    textAlign: 'right',
    marginTop: theme.spacing()
  },

  formContainer: {
    padding: theme.spacing(2)
  }
})

export default styles
