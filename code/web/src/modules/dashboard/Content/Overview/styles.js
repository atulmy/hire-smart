// UI Imports
import grey from '@material-ui/core/colors/grey'

// Component Styles
const styles = theme => ({
  root: {
    position: 'relative',
    padding: `${ theme.spacing.unit * 2.5 }px 0`,
  },

  kanban: {
    overflowX: 'auto',
    overflowY: 'hidden',
    position: 'relative',
    width: 'calc(100vw - 250px)'
  },

  columnsContainer: {
    display: 'inline-block',
    height: 'calc(100vh - 201px)'
  },
  column: {
    display: 'inline-block',
    float: 'left',
    height: 'calc(100vh - 196px)',
    overflowY: 'hidden'
  },
  columnTitle: {
    textAlign: 'center',
    margin: `0 ${ theme.spacing.unit * 2.5 }px`,
    paddingBottom: theme.spacing.unit
  },
  columnButtonAdd: {
    color: grey[500]
  },

  candidatesContainer: {
    padding: `0 ${ theme.spacing.unit * 2.5 }px`,
    height: 'calc(100vh - 223px)',
    overflowY: 'auto'
  },
  candidate: {
    margin: `${ theme.spacing.unit * 2.5 }px 0`,
    padding: theme.spacing.unit * 1.5,
    paddingBottom: theme.spacing.unit,
    cursor: 'pointer',
    backgroundColor: grey[50]
  },
  candidateName: {
    fontSize: '1.1rem'
  },
  candidateDivider: {
    marginTop: theme.spacing.unit
  },

  infoItem: {
    padding: 0
  },
  infoItemIcon: {
    marginRight: 0,
    color: grey[400],
    transform: 'scale(0.7)'
  },
  infoItemText: {
    padding: 0
  }
})

export default styles
