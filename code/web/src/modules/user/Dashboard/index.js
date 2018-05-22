// Imports
import React from 'react'
import { Helmet } from 'react-helmet'

// UI Imports
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'

// App Imports
import params from '../../../setup/config/params'
import { avatarLetter, avatarColor } from '../../../setup/helpers'

// Component
class Dashboard extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props
    const { value } = this.state;

    return(
      <div className={classes.root}>
        {/* Meta tags */}
        <Helmet>
          <title>Dashboard - { params.site.name }</title>
        </Helmet>

        <div className={classes.sidebar}>
          <List
            component="nav"
            subheader={<ListSubheader component="div" className={classes.sidebarTitle}>Clients</ListSubheader>}
          >
            <ListItem button style={{ backgroundColor: '#ddd' }}>
              <Avatar style={{ backgroundColor: avatarColor('Forestics') }}>{ avatarLetter('Forestics') }</Avatar>
              <ListItemText primary="Forestics" secondary="3 candidates" />
            </ListItem>

            <ListItem button>
              <Avatar>{ avatarLetter('Happytime') }</Avatar>
              <ListItemText primary="Happytime" secondary="10 candidates" />
            </ListItem>
          </List>
        </div>

        <div className={classes.content}>
          <div className={classes.tabsContainer}>
            <Tabs value={value} onChange={this.handleChange}>
              <Tab label="Overview" />
              <Tab label="Interviews" />
              <Tab label="Candidates" />
              <Tab label="Panel" />
            </Tabs>
          </div>

          <div className={classes.contentInner}>
            <Grid container>
              <Grid item md={12}>
                <Typography variant={'display1'}>
                  Dashboard
                </Typography>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Dashboard)
