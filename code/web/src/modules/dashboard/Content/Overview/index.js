// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

// UI Imports
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Drawer from '@material-ui/core/Drawer'
import Fade from '@material-ui/core/Fade'
import grey from '@material-ui/core/colors/grey'
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'

// App Imports
import params from '../../../../setup/config/params'
import { overviewTabs } from '../index'
import { getListByClient as getKanbanListByClient } from '../../../kanban/api/actions/query'
import { updateStatus as updateKanbanStatus } from '../../../kanban/api/actions/mutation'
import { messageShow } from '../../../common/api/actions'
import Loading from '../../../common/Loading'
import Column from './Column'
import Item from './Item'
import isEmpty from 'validator/lib/isEmpty'

// Component
class Overview extends PureComponent {

  constructor(props) {
    super(props)

    this.state = {
      candidateInfo: false
    }
  }

  componentDidMount() {
    this.refresh()
  }

  componentWillReceiveProps(nextProps) {
    const { clientDashboard: { client } } = nextProps

    if(client._id !== this.props.clientDashboard.client._id) {
      this.refresh(true, client._id)
    }
  }

  refresh = (isLoading = true, clientId) => {
    const { getKanbanListByClient, clientDashboard: { client } } = this.props

    getKanbanListByClient({ clientId: clientId ? clientId : client._id }, isLoading)
  }

  columnWidth = () => {
    let width = parseInt((window.innerWidth - 250) / params.kanban.columns.length, 10) - 1
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

  columnCount = (key) => {
    const { kanbansByClient } = this.props

    const count =  kanbansByClient.list && kanbansByClient.list.length > 0 && kanbansByClient.list.filter(item => item.status === key).length

    return count > 0 ? `(${ count })` : ''
  }

  handleDrop = (index, item) => {
    const { name } = item
    const droppedBoxNames = name ? { $push: [name] } : {}

    this.setState(
      update(this.state, {
        dustbins: {
          [index]: {
            lastDroppedItem: {
              $set: item,
            },
          },
        },
        droppedBoxNames,
      }),
    )
  }

  itemDropped = async (kanbanId, columnKey) => {
    const { messageShow, updateKanbanStatus } = this.props
    console.log(kanbanId)
    console.log(columnKey)

    try {
      const { data } = await updateKanbanStatus({ id: kanbanId, status: columnKey })

      console.log(data)
      if(data.errors && !isEmpty(data.errors)) {
        messageShow(data.errors[0].message)
      } else {
        this.refresh(false)
      }
    } catch(error) {
      console.log(error)

      messageShow('There was some error. Please try again.')
    }
  }

  render() {
    const { classes, kanbansByClient: { isLoading, list } } = this.props
    const { candidateInfo } = this.state
    const { kanban: { columns } } = params

    return (
      <div className={classes.root}>
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
                              <Typography variant="button" style={{ color: grey[800], textTransform: 'uppercase', fontWeight: 400, fontSize: '0.75rem' }}>
                                { column.name } { this.columnCount(column.key) }
                              </Typography>
                            </div>

                            {/* Candidates */}
                            <div className={classes.candidatesContainer}>
                              {
                                list && list.length > 0 && list.map(
                                  item => item.status === column.key &&
                                    <Item
                                      key={item._id}
                                      item={item}
                                      toggleDrawer={this.toggleDrawer}
                                    />
                                )
                              }

                              {/* Add */}
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
                        </Column>
                      )) }
                    </div>

                    {/* Candidate info */}
                    <Drawer
                      anchor={'right'}
                      open={candidateInfo}
                      onClose={this.toggleDrawer(false)}
                      ModalProps={{
                        BackdropProps: {
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
          }
        </div>
      </div>
    )
  }
}

// Component Properties
Overview.propTypes = {
  classes: PropTypes.object.isRequired,
  tabSwitch: PropTypes.func.isRequired,
  clientDashboard: PropTypes.object.isRequired,
  getKanbanListByClient: PropTypes.func.isRequired,
  updateKanbanStatus: PropTypes.func.isRequired,
  messageShow: PropTypes.func.isRequired
}

// Component State
function overviewState(state) {
  return {
    kanbansByClient: state.kanbansByClient,
    clientDashboard: state.clientDashboard
  }
}

export default compose(
  DragDropContext(HTML5Backend),
  connect(overviewState, { getKanbanListByClient, updateKanbanStatus, messageShow }),
  withStyles(styles)
)(Overview)
