// UI Imports
import grey from '@material-ui/core/colors/grey'

// Component Styles
const styles = theme => ({
  root: {
    position: 'relative',
  },

  actions: {
    textAlign: 'right',
    padding: `${ theme.spacing.unit }px ${ theme.spacing.unit * 2.5 }px`,
  },
  actionIcon: {
    width: 20,
    height: 20,
    marginRight: 5
  },

  kanban: {
    overflowX: 'auto',
    overflowY: 'hidden',
    position: 'relative',
    width: 'calc(100vw - 303px)'
  },

  columnsContainer: {
    display: 'inline-block',
    height: 'calc(100vh - 206px)'
  },
  columnTitle: {
    textAlign: 'center',
    margin: `0 ${ theme.spacing.unit * 2.5 }px`,
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit
  },
  columnButtonAdd: {
    color: grey[500],
    marginTop: theme.spacing.unit,
  },

  itemContainer: {
    padding: `0 ${ theme.spacing.unit * 2.5 }px`,
    height: 'calc(100vh - 243px)',
    overflowY: 'auto'
  },

  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.15)'
  }
})

export default styles
