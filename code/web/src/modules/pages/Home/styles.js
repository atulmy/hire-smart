// UI Imports
import yellow from '@material-ui/core/colors/yellow'
import grey from '@material-ui/core/colors/grey'

// Component Styles
const styles = theme => ({
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

  divider: {
    marginTop: '4rem',
    marginBottom: '4rem'
  },

  button: {
    margin: theme.spacing(),
    color: 'black',
    backgroundColor: 'white',
  },
  buttonCaption: {
    color: 'white',
    opacity: '0.6'
  },

  features: {
    marginTop: '4rem'
  },
  featureItem: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
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
  },

  bottomCta: {
    padding: '3rem 5rem 5rem 5rem',
    textAlign: 'center'
  },
  bottomCtaButton: {
    margin: theme.spacing(),
    color: theme.palette.getContrastText(theme.palette.primary[500]),
    backgroundColor: theme.palette.primary[500],
    '&:hover': {
      backgroundColor: theme.palette.primary[700],
    }
  },
  bottomCtaButtonCaption: {
    color: grey[400],
    opacity: '0.6'
  }
})

export default styles
