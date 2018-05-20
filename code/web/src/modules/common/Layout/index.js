// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'

// UI Imports
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'

// App Imports
import params from '../../../setup/config/params'
import { messageHide } from '../api/actions'
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
    const { children, classes, common: { message }, messageHide } = this.props

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

        {/* Message */}
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          open={message.open}
          autoHideDuration={5000}
          onClose={messageHide}
          message={message.text}
          action={[
            <IconButton
              key={'close'}
              color={'inherit'}
              onClick={messageHide}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </div>
    )
  }
}

// Component Properties
Layout.propTypes = {
  common: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  messageHide: PropTypes.func.isRequired
}

// Component State
function commonState(state) {
  return {
    common: state.common
  }
}

export default connect(commonState, { messageHide })(withStyles(styles)(Layout))
