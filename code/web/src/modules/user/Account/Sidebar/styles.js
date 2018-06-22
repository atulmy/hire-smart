// UI Imports
import grey from '@material-ui/core/colors/grey'

// Component Styles
const styles = theme => ({
  sidebar: {
    height: 'calc(100vh - 100px)',
    width: 250,
    backgroundColor: grey[100],
    borderRight: `1px solid ${ grey[200] }`,
    overflowY: 'auto'
  },

  title: {
    textTransform: 'uppercase',
    backgroundColor: grey[100],
  },

  icon: {
    marginLeft: 0,
    marginRight: 0
  }
})

export default styles
