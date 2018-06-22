// UI Imports
import yellow from '@material-ui/core/colors/yellow'
import red from '@material-ui/core/colors/red'

// Component Styles
const styles = theme => ({
  title: {
    flex: 1,
    textTransform: 'uppercase'
  },

  menu: {
    marginLeft: '-0.6rem',
    marginRight: '0.2rem'
  },

  account: {
    marginRight: '-0.6rem'
  },
  titleHighlight: {
    color: yellow[600]
  },

  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.15)'
  },

  button: {
    marginRight: theme.spacing.unit * 2,
    backgroundColor: 'white',
    color: red[500]
  },

  buttonIcon: {
    width: 18,
    height: 18,
    marginRight: 5,
    color: red[500]
  },

  tooltip: {
    fontSize: 14,
    width: 400
  }
})

export default styles
