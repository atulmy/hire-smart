// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

// UI Imports
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'

// App Imports
import Header from '../Header'
import Footer from '../Footer'
import Message from '../Message'

// Component
class Layout extends PureComponent {
  render() {
    const { children, classes } = this.props

    return (
      <div className={classes.root}>
        {/* Header */}
        <Header />

        {/* Main content */}
        <main className={classes.main}>
          { children }
        </main>

        {/* Footer */}
        <Footer />

        {/* Message */}
        <Message />
      </div>
    )
  }
}

// Component Properties
Layout.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Layout)
