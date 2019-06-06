// UI Imports
import grey from '@material-ui/core/colors/grey'
import blue from '@material-ui/core/colors/blue'

// Component Styles
const styles = theme => ({
  root: {
    position: 'relative',
  },

  actions: {
    textAlign: 'right',
    padding: `${ theme.spacing() }px ${ theme.spacing(2.5) }px`,
    paddingBottom: theme.spacing(),
  },
  actionIcon: {
    width: 20,
    height: 20,
    marginRight: 5
  },

  divider: {
    marginLeft: theme.spacing(2.5),
    marginRight: theme.spacing(2.5)
  },

  kanban: {
    overflowX: 'auto',
    overflowY: 'hidden',
    position: 'relative',
    width: 'calc(100vw - 250px)'
  },

  columnsContainer: {
    display: 'inline-block',
    height: 'calc(100vh - 206px)'
  },
  columnTitle: {
    textAlign: 'center',
    margin: `0 ${ theme.spacing(2.5) }px`,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(),
    cursor: 'default'
  },
  columnButtonAdd: {
    color: grey[500],
    marginTop: theme.spacing()
  },
  columnButtonAddPrimary: {
    color: blue[500],
    marginTop: theme.spacing()
  },

  itemContainer: {
    padding: `0 ${ theme.spacing(2.5) }px`,
    height: 'calc(100vh - 243px)',
    overflowY: 'auto'
  },

  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.15)'
  },

  drawer: {
    width: 450
  }
})

export default styles
