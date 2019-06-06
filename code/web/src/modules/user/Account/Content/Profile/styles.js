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
    color: grey[700]
  },

  content: {
    padding: theme.spacing(3)
  },

  item: {
    marginBottom: theme.spacing(2.5),
    borderBottom: `1px solid ${ grey[200] }`
  },

  actionIcon: {
    width: 20, height: 20, marginRight: 5
  },

  buttonsContainer: {
    textAlign: 'right',
    marginTop: theme.spacing()
  },
})

export default styles
