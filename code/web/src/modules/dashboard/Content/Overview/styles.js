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
    height: 'calc(100vh - 193px)'
  },
  column: {
    display: 'inline-block',
    float: 'left',
    height: 'calc(100vh - 190px)',
    overflowY: 'hidden'
  },
  columnTitle: {
    textAlign: 'center',
    margin: `0 ${ theme.spacing.unit * 2.5 }px`,
    paddingBottom: theme.spacing.unit
  },
  columnButtonAdd: {
    color: grey[500],
    marginTop: theme.spacing.unit,
  },

  candidatesContainer: {
    padding: `0 ${ theme.spacing.unit * 2.5 }px`,
    height: 'calc(100vh - 214px)',
    overflowY: 'auto'
  },

  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.15)'
  }
})

export default styles
