// Imports
import React from 'react'
import { Link } from 'react-router-dom'

// App Imports
import IconButton from '@material-ui/core/IconButton'
import IconAccountCircle from '@material-ui/icons/AccountCircle'
import routes from '../../../../setup/routes'

// Component
const ActionAccount = () => (
  <IconButton
    component={Link}
    to={routes.userProfile.path}
    color="inherit"
    aria-label="Back"
  >
    <IconAccountCircle />
  </IconButton>
)

export default ActionAccount
