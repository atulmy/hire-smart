// Component Styles
const styles = theme => ({
  root: {
    padding: theme.spacing(2.5),
    paddingTop: theme.spacing()
  },

  actions: {
    textAlign: 'right',
    paddingBottom: theme.spacing()
  },
  actionIcon: {
    width: 20, height: 20, marginRight: 5
  },

  drawer: {
    width: 450
  },

  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.15)'
  }
})

export default styles
