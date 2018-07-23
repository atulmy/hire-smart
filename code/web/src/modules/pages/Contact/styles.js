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
    padding: theme.spacing.unit * 3
  },

  caption: {
    marginBottom: theme.spacing.unit * 3
  },

  item: {
    marginBottom: theme.spacing.unit * 2.5,
    borderBottom: `1px solid ${ grey[200] }`,
    display: 'inline-block'
  },
})

export default styles
