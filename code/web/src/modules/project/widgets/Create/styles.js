// UI Imports
import grey from '@material-ui/core/colors/grey'
import blue from '@material-ui/core/colors/blue'

// Component Styles
const styles = theme => ({
  root: {
    flex: 1,
    paddingTop: theme.spacing(),
    paddingBottom: theme.spacing(),
    paddingRight: theme.spacing(3),
    paddingLeft: theme.spacing(3)
  },

  buttonsContainer: {
    textAlign: 'right',
    marginTop: theme.spacing()
  },

  buttonAdd: {
    color: grey[500]
  },
  buttonAddPrimary: {
    color: blue[500]
  },
})

export default styles
