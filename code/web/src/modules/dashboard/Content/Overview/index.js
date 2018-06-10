// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// UI Imports
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Drawer from '@material-ui/core/Drawer'
import Paper from '@material-ui/core/Paper'
import Fade from '@material-ui/core/Fade'
import Divider from '@material-ui/core/Divider'
import Tooltip from '@material-ui/core/Tooltip'
import IconCall from '@material-ui/icons/Call'
import IconThumbsUpDown from '@material-ui/icons/ThumbsUpDown'
import grey from '@material-ui/core/colors/grey'
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'

// App Imports
import params from '../../../../setup/config/params'
import { overviewTabs } from '../index'
// import { someAction } from './api/actions'

// Component
class Overview extends PureComponent {

  constructor(props) {
    super(props)

    this.state = {
      candidateInfo: false
    }
  }

  componentDidMount() {
    // const { someAction } = this.props
  }

  columnWidth = () => {
    let width = parseInt((window.innerWidth - 249) / params.kanban.columns.length, 10) - 1
    if(width < 225) {
      width = 225
    }
    return width
  }

  tabSwitch = () => {
    const { tabSwitch } = this.props

    tabSwitch(null, overviewTabs.candidates.key)
  }

  toggleDrawer = (open) => () => {
    this.setState({
      candidateInfo: open
    })
  }

  render() {
    const { classes } = this.props
    const { candidateInfo } = this.state
    const { kanban: { columns } } = params

    return (
      <Fade in={true}>
        <div className={classes.root}>
          <div className={classes.kanban}>
            <div
              className={classes.columnsContainer}
              style={{ width: (this.columnWidth() * columns.length) + columns.length }}
            >
              {/* Columns */}
              { columns.map((column, i) => (
                <div
                  key={column.key}
                  className={classes.column}
                  style={{ width: this.columnWidth(), borderRight: i !== (columns.length - 1) ? `1px solid ${ grey[200] }` : '' }}
                >
                  {/* Column Title */}
                  <div
                    className={classes.columnTitle}
                    style={{ borderBottom: `2px solid ${ column.color }`,  }}
                  >
                    <Typography variant="button" style={{ color: grey[800], textTransform: 'uppercase', fontWeight: 400, fontSize: '0.75rem' }}>
                      { column.name } (5)
                    </Typography>
                  </div>

                  {/* Candidates */}
                  <div className={classes.candidatesContainer}>
                    {
                      i === 0 &&
                      <Paper
                        className={classes.candidate}
                        onClick={this.toggleDrawer(true)}
                      >
                        <Typography variant={'title'} className={classes.candidateName}>
                          Jon Snow
                        </Typography>

                        <Typography color="textSecondary">
                          5.5 years
                        </Typography>
                        <Typography color="textSecondary">
                          9930306893
                        </Typography>

                        <Divider className={classes.candidateDivider} />

                        <List dense={true}>
                          <Tooltip
                            title={'Interview'}
                            placement={'right'}
                            enterDelay={500}
                          >
                            <ListItem className={classes.infoItem}>
                              <ListItemIcon className={classes.infoItemIcon}>
                                <IconCall />
                              </ListItemIcon>

                              <ListItemText
                                primary={'12th June, 3:30pm'}
                                className={classes.infoItemText}
                              />
                            </ListItem>
                          </Tooltip>

                          <Tooltip
                            title={'Panel'}
                            placement={'right'}
                            enterDelay={500}
                          >
                            <ListItem className={classes.infoItem}>
                              <ListItemIcon className={classes.infoItemIcon}>
                                <IconThumbsUpDown />
                              </ListItemIcon>

                              <ListItemText
                                primary={'Tyrion Lannister'}
                                className={classes.infoItemText}
                              />
                            </ListItem>
                          </Tooltip>
                        </List>
                      </Paper>
                    }

                    {
                      i === 0 &&
                      <Button
                        fullWidth={true}
                        className={classes.columnButtonAdd}
                        onClick={this.tabSwitch}
                      >
                        Add Candidate
                      </Button>
                    }
                  </div>
                </div>
              )) }
            </div>
          </div>

          {/* Candidate info */}
          <Drawer
            anchor={'right'}
            open={candidateInfo}
            onClose={this.toggleDrawer(false)}
            ModalProps={{
              BackdropProps: {
                //invisible: true,
                classes: { root: classes.backdrop }
              }
            }}
          >
            <div style={{ width: 300 }}>
              <p>Info</p>
            </div>
          </Drawer>
        </div>
      </Fade>
    )
  }
}

// Component Properties
Overview.propTypes = {
  classes: PropTypes.object.isRequired,
  tabSwitch: PropTypes.func.isRequired
}

// Component State
function overviewState(state) {
  return {
    common: state.common
  }
}

export default connect(overviewState, { /* someAction */ })(withStyles(styles)(Overview))
