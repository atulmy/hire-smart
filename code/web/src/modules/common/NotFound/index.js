// Imports
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

// UI Imports
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles/index'
import styles from './styles'

// App Imports
import routes from '../../../setup/routes'
import AlignCenterMiddle from '../AlignCenterMiddle'

// Component
const NotFound = (props) => (
  <div className={props.classes.root}>
    <AlignCenterMiddle>
      <Typography variant={'h5'} gutterBottom>
        Its a 404
      </Typography>

      <Typography variant={'subtitle1'} gutterBottom>
        The page you are looking for does not exists or has been removed.
      </Typography>

      <Link to={routes.home.path}>
        <Button variant={'contained'} color={'primary'} className={props.classes.button}>
          Back to Home
        </Button>
      </Link>
    </AlignCenterMiddle>
  </div>
)

// Component Properties
NotFound.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(NotFound)

