// UI Imports
import grey from '@material-ui/core/colors/grey'

// Component Styles
const styles = theme => ({
  root: {
    display: 'block',
    position: 'relative'
  },
  paper: {
    margin: `${ theme.spacing(2.5) }px 0`,
    padding: theme.spacing(1.5),
    paddingBottom: theme.spacing(),
    cursor: 'pointer',
    backgroundColor: grey[50]
  },
  name: {
    fontSize: '1.1rem'
  },
  divider: {
    marginTop: theme.spacing()
  },

  infoItem: {
    padding: 0
  },
  infoItemIcon: {
    marginRight: 0,
    minWidth: 30,
    transform: 'scale(0.7)',
    color: grey[400]
  },
  infoItemText: {
    padding: 0
  },
})

export default styles
