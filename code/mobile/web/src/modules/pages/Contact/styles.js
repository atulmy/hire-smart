// UI Imports
import grey from '@material-ui/core/colors/grey'

// Component Styles
const styles = theme => ({
  grow: {
    flexGrow: 1
  },

  item: {
    marginBottom: theme.spacing.unit * 2.5,
    borderBottom: `1px solid ${ grey[200] }`
  },
})

export default styles
