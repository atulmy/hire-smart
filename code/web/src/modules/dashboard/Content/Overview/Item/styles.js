// UI Imports
import grey from '@material-ui/core/colors/grey'

// Component Styles
const styles = theme => ({
  root: {
    display: 'block',
    position: 'relative'
  },
  paper: {
    margin: `${ theme.spacing.unit * 2.5 }px 0`,
    padding: theme.spacing.unit * 1.5,
    paddingBottom: theme.spacing.unit,
    cursor: 'pointer',
    backgroundColor: grey[50]
  },
  name: {
    fontSize: '1.1rem'
  },
  divider: {
    marginTop: theme.spacing.unit
  },

  infoItem: {
    padding: 0
  },
  infoItemIcon: {
    marginRight: 0,
    transform: 'scale(0.7)'
  },
  infoItemText: {
    padding: 0
  },
})

export default styles
