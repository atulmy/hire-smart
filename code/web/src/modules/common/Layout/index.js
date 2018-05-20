// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'

// UI Imports
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'

// App Imports
import params from '../../../setup/config/params'
import Header from '../Header'
import Footer from '../Footer'

// Component
class Layout extends PureComponent {
  // Remove the server-side injected CSS.
  componentDidMount() {
    const serverSideStyles = document.getElementById('server-side-css')

    if (serverSideStyles && serverSideStyles.parentNode) {
      serverSideStyles.parentNode.removeChild(serverSideStyles)
    }
  }

  render() {
    const { children, classes } = this.props

    return (
      <div className={classes.root}>
        {/* Meta tags */}
        <Helmet>
          <title>{ params.site.title }</title>
          <meta name={'description'} content={params.site.description} />
        </Helmet>

        {/* Header */}
        <Header />

        {/* Main content */}
        <main className={classes.main}>
          { children }
        </main>

        {/* Footer */}
        <Footer />
      </div>
    )
  }
}

// Component Properties
Layout.propTypes = {
  common: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
}

// Component State
function commonState(state) {
  return {
    common: state.common
  }
}

export default connect(commonState, {})(withStyles(styles)(Layout))
