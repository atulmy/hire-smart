// Component Styles
const styles = theme => ({
  root: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing.unit * 4
  },

  description: {
    color: 'white',
    marginBottom: theme.spacing.unit * 3,
    lineHeight: 1.3
  },

  button: {
    color: 'black',
    backgroundColor: 'white',
  }
})

export default styles
