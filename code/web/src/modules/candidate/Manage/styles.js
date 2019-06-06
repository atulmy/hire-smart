// UI Imports
import grey from '@material-ui/core/colors/grey'

// Component Styles
const styles = theme => ({
  toolbar: {
    backgroundColor: grey[200],
    minHeight: 50
  },

  title: {
    flex: 1,
    textTransform: 'uppercase',
    color: grey[700]
  },

  content: {
    padding: theme.spacing(3)
  },
})

export default styles
