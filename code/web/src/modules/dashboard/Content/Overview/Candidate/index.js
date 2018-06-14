// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

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
import params from '../../../../../setup/config/params'

// Component
class Candidate extends PureComponent {
  render() {
    const { classes, item: { candidateId, interviews, highlight }, toggleDrawer } = this.props

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

        {
          interviews.length > 0 && interviews.map(interview => (
            <List dense={true}>
              <ListItem title={'Interview'} className={classes.infoItem}>
                <ListItemIcon className={classes.infoItemIcon}>
                  <IconCall />
                </ListItemIcon>

                <ListItemText
                  primary={moment(interview.panelId.dateTime).format(`${ params.date.format.nice.date }, ${ params.date.format.nice.time }`)}
                  className={classes.infoItemText}
                />
              </ListItem>

              <ListItem title={'Panel'} className={classes.infoItem}>
                <ListItemIcon className={classes.infoItemIcon}>
                  <IconThumbsUpDown />
                </ListItemIcon>

                <ListItemText
                  primary={interview.panelId.name}
                  className={classes.infoItemText}
                />
              </ListItem>
            </List>
          ))
        }
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

