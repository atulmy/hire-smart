// Imports
import React, { PureComponent } from 'react'
import { Helmet } from 'react-helmet'

// UI Imports
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'

// App Imports
import Details from './Details'
import People from './People'

// Component
class Manage extends PureComponent {
  constructor () {
    super()

    this.state = {
      tab: 'details'
    }
  }

  tabSwitch = (event, tab) => {
    this.setState({tab})
  }

  render () {
    const { classes } = this.props
    const { tab } = this.state

    return (
      <div>
        {/* Meta tags */}
        <Helmet>
          <title>Organization - HireSmart</title>
        </Helmet>

        {/* Toolbar - Heading */}
        <Toolbar className={classes.toolbar}>
          <Typography
            variant={'subheading'}
            color={'inherit'}
            className={classes.title}
          >
            Organization
          </Typography>
        </Toolbar>

        {/* Toolbar Secondary - Tabs */}
        <Toolbar className={classes.toolbarSecondary}>
          <Tabs
            value={tab}
            onChange={this.tabSwitch}
          >
            <Tab label={'Details'} value={'details'}/>
            <Tab label={'People'} value={'people'}/>
          </Tabs>
        </Toolbar>

        {/* Tabs Content */}
        <div className={classes.tabContent}>
          {
            {
              details: <Details />,
              people: <People />
            }[tab]
          }
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Manage)
