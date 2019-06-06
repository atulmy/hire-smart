// UI Imports
import grey from '@material-ui/core/colors/grey'

// Component Styles
const styles = theme => ({
  toolbar: {
    backgroundColor: grey[200],
    minHeight: 50
  },

  toolbarIcon: {
    color: grey[500],
    marginRight: '-0.6rem'
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
