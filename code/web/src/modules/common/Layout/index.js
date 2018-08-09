// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'

// UI Imports
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'

// App Imports
import { APP_URL } from '../../../setup/config/env'
import params from '../../../setup/config/params'
import Header from '../Header'
import Footer from '../Footer'
import Message from '../Message'

// Component
class Layout extends PureComponent {
  render() {
    const { children, classes } = this.props

    return (
      <div className={classes.root}>
        {/* Meta tags */}
        <Helmet>
          <title>{ params.site.title }</title>
          <meta name={'description'} content={params.site.description} />
          <meta name={'keywords'} content={params.site.keywords} />
          <meta name={'author'} content={params.site.author} />
          <meta name={'copyright'} content={params.site.copyright} />
          <meta name={'application-name'} content={params.site.applicationName} />

          <meta name={'og:title'} content={params.site.title} />
          <meta name={'og:description'} content={params.site.description} />
          <meta name={'og:url'} content={params.site.url} />
          <meta name={'og:image'} content={`${ APP_URL }/images/${ params.site.image }`} />
          <meta name={'og:site_name'} content={params.site.applicationName} />
          <meta name={'og:type'} content={'website'} />
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
