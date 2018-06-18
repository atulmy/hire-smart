// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { compose } from 'redux'
import { DragSource } from 'react-dnd'

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
import IconVoiceChat from '@material-ui/icons/VoiceChat'
import IconGroup from '@material-ui/icons/Group'
import IconAssignment from '@material-ui/icons/Assignment'
import { withStyles } from '@material-ui/core/styles/index'
import styles from './styles'

// App Imports
import params from '../../../../../setup/config/params'
import { plural } from '../../../../../setup/helpers'

// Component
class Item extends PureComponent {
  render() {
    const { classes, item: { candidateId, interviews, highlight }, detailsOpen, isDragging, connectDragSource } = this.props

    return connectDragSource(
      <div>
        <Paper
          className={classes.root}
          onClick={detailsOpen}
        >
          {/* Item details */}
          <Typography variant={'title'} className={classes.name} gutterBottom>
            { candidateId.name }
          </Typography>

          {
            candidateId.jobId && candidateId.jobId.role &&
            <Typography color="textSecondary" title={'Job role'}>
              { candidateId.jobId.role }
            </Typography>
          }

          <Typography color="textSecondary" title={'Experience'}>
            { candidateId.experience } year{ plural(candidateId.experience) }
          </Typography>

          {/* Interviews */}
          {
            interviews.length > 0 &&
            <React.Fragment>
              <Divider className={classes.divider} />

              {
                interviews.map(interview => (
                  <List key={interview._id} dense={true}>
                    <ListItem title={`Date and time of ${ interview.mode } interview`} className={classes.infoItem}>
                      <ListItemIcon className={classes.infoItemIcon}>
                        {
                          {
                            telephonic: <IconCall />,
                            online: <IconVoiceChat />,
                            f2f: <IconGroup />,
                            assignment: <IconAssignment />,
                          }[interview.mode]
                        }
                      </ListItemIcon>

                      <ListItemText
                        primary={moment(interview.dateTime).format(`${ params.date.format.nice.date }, ${ params.date.format.nice.time }`)}
                        className={classes.infoItemText}
                      />
                    </ListItem>

                    <ListItem title={'Interviewer'} className={classes.infoItem}>
                      <ListItemIcon className={classes.infoItemIcon}>
                        <IconThumbsUpDown />
                      </ListItemIcon>

                      <ListItemText
                        primary={interview.interviewerId.name}
                        className={classes.infoItemText}
                      />
                    </ListItem>
                  </List>
                ))
              }
            </React.Fragment>
          }
        </Paper>
      </div>
    )
  }
}

// Component Properties
Item.propTypes = {
  classes: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
  detailsOpen: PropTypes.func.isRequired
}

// Drag and Drop
const cardSource = {
  beginDrag(props) {
    return {
      kanbanId: props.item._id
    }
  },

  endDrag(props) {

  }
};
function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
    didDrop: monitor.didDrop(),
  };
}

export default compose(
  DragSource('card', cardSource, collect),
  withStyles(styles)
)(Item)
