// Imports
import React, { PureComponent } from 'react'
import { Helmet } from 'react-helmet'

// UI Imports
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Fade from '@material-ui/core/Fade'
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'

// App Imports
import Details from './Details'
import People from './People'

// Component
class Manage extends PureComponent {
  constructor() {
    super()

    this.state = {
      tab: 'people'
    }
  }

  tabSwitch = (event, tab) => {
    this.setState({tab})
  }

  render () {
    const { classes } = this.props
    const { tab } = this.state

    return (
      <Fade in={true}>
        <div>
          {/* Meta tags */}
          <Helmet>
            <title>Manage Organization - HireSmart</title>
          </Helmet>

          {/* Toolbar - Heading */}
          <Toolbar className={classes.toolbar}>
            <Typography
              variant={'body2'}
              color={'inherit'}
              className={classes.title}
            >
              Manage Organization
            </Typography>
          </Toolbar>

          {/* Toolbar Secondary - Tabs */}
          <Toolbar className={classes.toolbarSecondary}>
            <Tabs
              value={tab}
              onChange={this.tabSwitch}
            >
              <Tab label={'People'} value={'people'} className={classes.tabItem} />
              <Tab label={'Details'} value={'details'} className={classes.tabItem} />
            </Tabs>
          </Toolbar>

          {/* Tabs Content */}
          <div className={classes.tabContent}>
            {
              {
                people: <People />,
                details: <Details />
              }[tab]
            }
          </div>
        </div>
      </Fade>
    )
  }
}

export default withStyles(styles)(Manage)
