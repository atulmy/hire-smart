// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

// UI Imports
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconCall from '@material-ui/icons/Call'
import IconThumbsUpDown from '@material-ui/icons/ThumbsUpDown'
import { withStyles } from '@material-ui/core/styles/index'
import styles from './styles'

// App Imports

// Component
class Candidate extends PureComponent {
  render() {
    const { classes, item: { candidateId, interviewId, highlight }, toggleDrawer } = this.props

    return (
      <Paper
        className={classes.root}
        onClick={toggleDrawer(true)}
      >
        <Typography variant={'title'} className={classes.name}>
          { candidateId.name }
        </Typography>

        <Typography color="textSecondary">
          { candidateId.mobile }
        </Typography>

        <Typography color="textSecondary">
          { candidateId.experience } years
        </Typography>

        <Divider className={classes.divider} />

        <List dense={true}>
          <ListItem title={'Interview'} className={classes.infoItem}>
            <ListItemIcon className={classes.infoItemIcon}>
              <IconCall />
            </ListItemIcon>

            <ListItemText
              primary={'12th June, 3:30pm'}
              className={classes.infoItemText}
            />
          </ListItem>

          <ListItem title={'Panel'} className={classes.infoItem}>
            <ListItemIcon className={classes.infoItemIcon}>
              <IconThumbsUpDown />
            </ListItemIcon>

            <ListItemText
              primary={'Tyrion Lannister'}
              className={classes.infoItemText}
            />
          </ListItem>
        </List>
      </Paper>
    )
  }
}

// Component Properties
Candidate.propTypes = {
  classes: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
  toggleDrawer: PropTypes.func.isRequired
}

export default withStyles(styles)(Candidate)

