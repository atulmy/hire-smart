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

  drawer: {
    width: 400
  },

  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.15)'
  }
})

export default styles
