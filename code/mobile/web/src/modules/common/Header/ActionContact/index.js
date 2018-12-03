// Imports
import React from 'react'
import { Link } from 'react-router-dom'

// App Imports
import IconButton from '@material-ui/core/IconButton/IconButton'
import IconPhone from '@material-ui/icons/Phone'
import routes from '../../../../setup/routes'

// Component
const ActionContact = () => (
  <IconButton
    component={Link}
    to={routes.pagesContact.path}
    color="inherit"
    aria-label="Back"
  >
    <IconPhone />
  </IconButton>
)

export default ActionContact
