// Component Styles
const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 2.5,
    paddingTop: theme.spacing.unit
  },

  actions: {
    textAlign: 'right',
    paddingBottom: theme.spacing.unit
  },
  actionIcon: {
    width: 20, height: 20, marginRight: 5
  },

  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.15)'
  },

  drawer: {
    width: 350
  }
})

export default styles
