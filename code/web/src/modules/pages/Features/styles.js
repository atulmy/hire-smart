// UI Imports
import grey from '@material-ui/core/colors/grey'

// Component Styles
const styles = theme => ({
  toolbar: {
    backgroundColor: grey[200],
    minHeight: 50
  },

  toolbarIcon: {
    color: grey[500],
    marginRight: '-0.6rem'
  },

  title: {
    flex: 1,
    textTransform: 'uppercase',
    color: grey[700]
  },

  content: {
    padding: `4rem 6rem`
  },

  divider: {
    marginTop: '4rem',
    marginBottom: '4rem'
  },

  featureItemTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column'
  },
  featureItemImageContainer: {
    textAlign: 'center'
  },
  featureItemTitle: {
    fontFamily: `"Raleway", "Helvetica", "Arial", sans-serif`,
    color: 'black'
  },
  featureItemSubTitle: {
    padding: '0 5rem',
    textAlign: 'center'
  },
  featureItemImage: {
    height: 235
  },
})

export default styles
