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
  },

  buttonUpload: {
    marginTop: theme.spacing(2.5)
  },

  buttonIcon: {
    width: 20, height: 20, marginRight: 5
  },
})

export default styles
