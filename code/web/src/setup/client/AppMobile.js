// Imports
import React from 'react'

// UI Imports
import { MuiThemeProvider } from '@material-ui/core/styles'
import theme from './theme'

// App Imports
import MobileNotSupported from '../../modules/pages/MobileNotSupported'

const AppMobile = () => (
  <MuiThemeProvider theme={theme} sheetsManager={new Map()}>
    <MobileNotSupported />
  </MuiThemeProvider>
)

export default AppMobile
