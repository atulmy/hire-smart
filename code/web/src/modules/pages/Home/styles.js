// UI Imports
import yellow from 'material-ui/colors/yellow'

// Component Styles
const styles = theme => ({
  root: {

  },

  hero: {
    height: '40vh',
    minHeight: '30rem',
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.primary[500]
  },

  title: {
    fontSize: '3.8rem',
    color: 'white',
    fontFamily: `"Raleway", "Helvetica", "Arial", sans-serif`,
    textTransform: 'uppercase',
    fontWeight: 600
  },
  titleHighlight: {
    color: yellow[600]
  },
  subTitle: {
    color: 'white'
  },

  button: {
    margin: theme.spacing.unit,
    color: 'black',
    backgroundColor: 'white',
  },
  buttonCaption: {
    color: 'white',
    opacity: '0.6'
  },

  features: {

  },


})

export default styles
