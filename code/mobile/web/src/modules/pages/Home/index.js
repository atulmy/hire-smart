// Imports
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

// UI Imports
import Button from '@material-ui/core/Button/Button'
import Typography from '@material-ui/core/Typography/Typography'
import { withStyles } from '@material-ui/core/styles/index'
import styles from './styles'

// App Imports
import params from '../../../setup/config/params'
import routes from '../../../setup/routes'
import AuthCheck from '../../auth/AuthCheck'
import Body from '../../common/Body'
import Logo from '../../common/Logo'

// Component
const Home = ({ classes }) => (
  <Body background={'primary'}>
    <div className={classes.root}>
      <Logo size={'h4'} />

      <Typography variant={'subtitle1'} className={classes.description}>{ params.site.description }</Typography>

      <Button component={Link} to={routes.userLogin.path} variant="contained" className={classes.button}>Login</Button>
    </div>

    {/* Auth Check */}
    <AuthCheck />
  </Body>
)

// Component Properties
Home.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Home)

