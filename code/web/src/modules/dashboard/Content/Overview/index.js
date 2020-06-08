// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

// UI Imports
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import Drawer from '@material-ui/core/Drawer'
import Divider from '@material-ui/core/Divider'
import IconCached from '@material-ui/icons/Cached'
import Fade from '@material-ui/core/Fade'
import grey from '@material-ui/core/colors/grey'
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'

// App Imports
import params from '../../../../setup/config/params'
import { overviewTabs } from '../index'
import { getListByProject as getKanbanListByProject } from '../../../kanban/api/actions/query'
import { updateStatus as updateKanbanStatus } from '../../../kanban/api/actions/mutation'
import { editClose } from '../../../candidate/api/actions/mutation'
import { messageShow, messageHide } from '../../../common/api/actions'
import Loading from '../../../common/Loading'
import CreateOrEdit from '../../../candidate/Manage/CreateOrEdit'
import Column from './Column'
import Item from './Item'
import Details from './Details'

// Component
class Overview extends PureComponent {

  constructor(props) {
    super(props)

    this.state = {
      detailsOpen: false,
      drawerAdd: false,
      kanbanId: null
    }
  }

  componentDidMount() {
    this.refresh()
  }

  componentWillReceiveProps(nextProps) {
    const { projectDashboard: { project } } = nextProps

    if(project._id !== this.props.projectDashboard.project._id) {
      this.refresh(true, false, project._id)
    }
  }

  refresh = (isLoading = true, forceRefresh = false, projectId) => {
    const { getKanbanListByProject, projectDashboard: { project } } = this.props

    getKanbanListByProject({ projectId: projectId ? projectId : project._id }, isLoading, forceRefresh)
  }

  columnWidth = () => {
    let width = parseInt((window.innerWidth - 250) / params.kanban.columns.length, 10) - 1
    if(width < 200) {
      width = 200
    }
    return width
  }

  tabSwitch = () => {
    const { tabSwitch } = this.props

    tabSwitch(null, overviewTabs.candidates.key)
  }

  detailsOpen = (kanbanId) => () => {
    this.setState({
      kanbanId
    }, () => {
      this.toggleDrawer(true)()
    })
  }

  toggleDrawer = (detailsOpen) => () => {
    this.setState({
      detailsOpen
    })
  }

  toggleDrawerAdd = (drawerAdd) => () => {
    this.setState({
      drawerAdd
    })
  }

  columnCount = (key) => {
    const { kanbansByProject } = this.props

    const count =  kanbansByProject.list && kanbansByProject.list.length > 0 && kanbansByProject.list.filter(item => item.status === key).length

    return count > 0 ? `(${ count })` : ''
  }

  itemDropped = async (kanbanId, columnKey) => {
    const { updateKanbanStatus, messageShow } = this.props

    // messageShow('Please wait..')

    try {
      const { data } = await updateKanbanStatus({ id: kanbanId, status: columnKey })

      if(data.errors && data.errors.length > 0) {
        messageShow(data.errors[0].message)
      } else {
        // messageHide()

        this.refresh(false)
      }
    } catch(error) {
      messageShow('There was some error. Please try again.')
    }
  }

  successCallback = () => {
    this.refresh(false)

    this.toggleDrawerAdd(false)()
  }

  add = () => {
    const { editClose } = this.props

    editClose()

    this.toggleDrawerAdd(true)()
  }

  render() {
    const { classes, projectDashboard: { project }, kanbansByProject: { isLoading, list } } = this.props
    const { detailsOpen, drawerAdd, kanbanId } = this.state
    const { kanban: { columns } } = params

    return (
      <DndProvider backend={HTML5Backend}>
        <div className={classes.root}>
          {/* Actions */}
          <div className={classes.actions}>
            <Button onClick={() => this.refresh(true, true, project._id)}>
              <IconCached className={classes.actionIcon} />
              Refresh
            </Button>
          </div>

          <Divider className={classes.divider} />

          {/* Kanban */}
          <div className={classes.kanban}>
            {
              isLoading
                ? <Loading />
                : <Fade in={true}>
                    <div>
                      <div
                        className={classes.columnsContainer}
                        style={{ width: (this.columnWidth() * columns.length) + columns.length }}
                      >
                        {/* Columns */}
                        { columns.map((column, i) => (
                          <Column
                            key={column.key}
                            columnKey={column.key}
                            columnWidth={this.columnWidth()}
                            last={i !== columns.length - 1}
                            itemDropped={this.itemDropped}
                          >
                            <div>
                              {/* Column Title */}
                              <div
                                className={classes.columnTitle}
                                style={{ borderBottom: `2px solid ${ column.color }`,  }}
                              >
                                <Tooltip title={column.help} placement={'top'} enterDelay={100}>
                                  <Typography variant="button" style={{ color: grey[800], textTransform: 'uppercase', fontWeight: 400, fontSize: '0.75rem' }}>
                                    { column.name } { this.columnCount(column.key) }
                                  </Typography>
                                </Tooltip>
                              </div>

                              {/* Candidates */}
                              <div className={classes.itemContainer}>
                                {
                                  list && list.length > 0 && list.map(
                                    item => item.status === column.key &&
                                      <Item
                                        key={item._id}
                                        item={item}
                                        detailsOpen={this.detailsOpen(item._id)}
                                      />
                                  )
                                }

                                {/* Add */}
                                {
                                  i === 0 &&
                                  <Button
                                    fullWidth={true}
                                    className={list && list.length > 0 ? classes.columnButtonAdd : classes.columnButtonAddPrimary}
                                    onClick={this.add}
                                  >
                                    Add Candidate
                                  </Button>
                                }
                              </div>
                            </div>
                          </Column>
                        )) }
                      </div>

                      {/* Candidate info */}
                      <Drawer
                        anchor={'right'}
                        open={detailsOpen}
                        onClose={this.toggleDrawer(false)}
                        ModalProps={{
                          BackdropProps: {
                            classes: { root: classes.backdrop }
                          }
                        }}
                      >
                        <div className={classes.drawer}>
                          <Details
                            kanbanId={kanbanId}
                            toggleDrawer={this.toggleDrawer}
                          />
                        </div>
                      </Drawer>

                      {/* Candidate create or edit */}
                      <Drawer
                        anchor={'right'}
                        open={drawerAdd}
                        onClose={this.toggleDrawerAdd(false)}
                        ModalProps={{
                          BackdropProps: {
                            classes: { root: classes.backdrop }
                          }
                        }}
                      >
                        <div className={classes.drawer}>
                          <CreateOrEdit
                            elevation={0}
                            projectId={project._id}
                            projectShowLoading={false}
                            successCallback={this.successCallback}
                            projectSelectionHide={true}
                          />
                        </div>
                      </Drawer>
                    </div>
                  </Fade>
            }
          </div>
        </div>
      </DndProvider>
    )
  }
}

// Component Properties
Overview.propTypes = {
  classes: PropTypes.object.isRequired,
  tabSwitch: PropTypes.func.isRequired,
  projectDashboard: PropTypes.object.isRequired,
  getKanbanListByProject: PropTypes.func.isRequired,
  updateKanbanStatus: PropTypes.func.isRequired,
  editClose: PropTypes.func.isRequired,
  messageShow: PropTypes.func.isRequired,
  messageHide: PropTypes.func.isRequired
}

// Component State
function overviewState(state) {
  return {
    kanbansByProject: state.kanbansByProject,
    projectDashboard: state.projectDashboard
  }
}

export default compose(
  connect(overviewState, { getKanbanListByProject, updateKanbanStatus, editClose, messageShow, messageHide }),
  withStyles(styles)
)(Overview)
