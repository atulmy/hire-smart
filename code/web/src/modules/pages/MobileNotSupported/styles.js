// Component Styles
import yellow from '@material-ui/core/colors/yellow'

const styles = theme => ({
  root: {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.primary[500],
    padding: '0 1rem'
  },

  title: {
    fontSize: '2rem',
    color: 'white',
    fontFamily: `"Raleway", "Helvetica", "Arial", sans-serif`,
    textTransform: 'uppercase',
    fontWeight: 600
  },
  titleHighlight: {
    color: yellow[600]
  },
  subTitle: {
    marginTop: '1rem',
    color: 'white',
  },
})

export default styles
