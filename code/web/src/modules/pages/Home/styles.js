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
    marginBottom: '2rem'
  },
  featureItem: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '2rem'
  },
  featureItemLeft: {
    flex: 1,
    textAlign: 'center'
  },
  featureItemRight: {
    flex: 1,
    textAlign: 'center'
  },
  featureItemTitle: {
    fontFamily: `"Raleway", "Helvetica", "Arial", sans-serif`,
    color: 'black'
  },
  featureItemSubTitle: {
    padding: '0 5rem'
  },
  featureItemImage: {
    boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)'
  }
})

export default styles
