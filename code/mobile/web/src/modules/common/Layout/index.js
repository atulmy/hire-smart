// Imports
import React from 'react'
import PropTypes from 'prop-types'

// UI Imports
import grey from '@material-ui/core/colors/grey'
import blue from '@material-ui/core/colors/blue'
import { withStyles } from '@material-ui/core/styles/index'
import styles from './styles'

// App Imports
import Footer from '../Footer'

// Component
const Layout = ({ background, showFooter = false, classes, children }) => (
  <div
    id="layout"
    className={classes.root}
    style={{ background: background === 'primary' ? blue[500] : grey[50] }}
  >
    { children }


    {
      showFooter &&
      <Footer />
    }
  </div>
)

// Component Properties
Layout.propTypes = {
  background: PropTypes.string,
  showFooter: PropTypes.bool,
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Layout)
