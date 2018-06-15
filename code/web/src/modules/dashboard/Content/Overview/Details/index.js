// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment'

// UI Imports
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import IconButton from '@material-ui/core/IconButton'
import IconClose from '@material-ui/icons/Close'
import IconRadioButtonChecked from '@material-ui/icons/RadioButtonChecked'
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'

// App Imports
import params from '../../../../../setup/config/params'
import { plural } from '../../../../../setup/helpers'
import { get } from '../../../../kanban/api/actions/query'
import Loading from '../../../../common/Loading'
import EmptyMessage from '../../../../common/EmptyMessage'

// Component
class Details extends PureComponent {

  constructor(props) {
    super(props)

    this.state = {
      tab: 'candidate'
    }
  }

  componentDidMount() {
    this.refresh()
  }

  refresh = (isLoading = true) => {
    const { kanbanId, get } = this.props

    get(kanbanId, isLoading)
  }

  tabSwitch = (event, tab) => {
    this.setState({ tab })
  }

  status = (status) => {
    return params.kanban.columns.filter(column => column.key === status)[0]
  }

  render() {
    const { classes, kanbanId, kanban: { isLoading, item: { candidateId, interviews, status, highlight } }, toggleDrawer } = this.props
    const { tab } = this.state

    return (
      <div className={classes.root}>
        {
          isLoading
            ? <Loading />
            : <React.Fragment>
                <div className={classes.tabs}>
                  <Tabs
                    value={tab}
                    onChange={this.tabSwitch}
                  >
                    <Tab label={'Candidate'} value={'candidate'} style={{ minWidth: 'auto' }} />
                    <Tab label={'Interview'} value={'interview'} style={{ minWidth: 'auto' }} />
                  </Tabs>
                </div>

                <div className={classes.tabContent}>
                  {
                    {
                      candidate:
                        <React.Fragment>
                          {
                            candidateId &&
                            <div>
                              {/* Status */}
                              <div className={classes.item}>
                                <Typography variant={'caption'} gutterBottom>
                                  Status
                                </Typography>

                                <Typography gutterBottom>
                                  { this.status(status).name }

                                  <IconRadioButtonChecked style={{ color: this.status(status).color, float: 'right', paddingBottom: 4 }} />
                                </Typography>
                              </div>

                              {/* Name */}
                              <div className={classes.item}>
                                <Typography variant={'caption'} gutterBottom>
                                  Name
                                </Typography>

                                <Typography gutterBottom>
                                  { candidateId.name }
                                </Typography>
                              </div>

                              {/* Email */}
                              <div className={classes.item}>
                                <Typography variant={'caption'} gutterBottom>
                                  Email
                                </Typography>

                                <Typography gutterBottom>
                                  { candidateId.email }
                                </Typography>
                              </div>

                              {/* Mobile */}
                              <div className={classes.item}>
                                <Typography variant={'caption'} gutterBottom>
                                  Mobile
                                </Typography>

                                <Typography gutterBottom>
                                  { candidateId.mobile }
                                </Typography>
                              </div>

                              {/* Experience */}
                              <div className={classes.item}>
                                <Typography variant={'caption'} gutterBottom>
                                  Experience
                                </Typography>

                                <Typography gutterBottom>
                                  { candidateId.experience } year{ plural(candidateId.experience) }
                                </Typography>
                              </div>

                              {/* Resume */}
                              <div className={classes.item}>
                                <Typography variant={'caption'} gutterBottom>
                                  Resume
                                </Typography>

                                <Typography gutterBottom>
                                  { candidateId.resume }
                                </Typography>
                              </div>

                              {/* Salary Current */}
                              <div className={classes.item}>
                                <Typography variant={'caption'} gutterBottom>
                                  Salary Current
                                </Typography>

                                <Typography gutterBottom>
                                  { candidateId.salaryCurrent }
                                </Typography>
                              </div>

                              {/* Salary Expected */}
                              <div className={classes.item}>
                                <Typography variant={'caption'} gutterBottom>
                                  Salary Expected
                                </Typography>

                                <Typography gutterBottom>
                                  { candidateId.salaryExpected }
                                </Typography>
                              </div>
                            </div>
                          }
                        </React.Fragment>,

                      interview:
                        <React.Fragment>
                          {
                            interviews && interviews.length > 0
                              ? <div>
                                  { interviews.map(({ _id, dateTime, interviewerId }, i) => (
                                    <div key={_id} className={classes.interview}>
                                      <Typography variant={'button'} className={classes.interviewTitle}>
                                        Interview #{ i+1 }
                                      </Typography>

                                      {/* Name */}
                                      <div className={classes.item}>
                                        <Typography variant={'caption'} gutterBottom>
                                          Date and time
                                        </Typography>

                                        <Typography gutterBottom>
                                          { moment(dateTime).format(`${ params.date.format.nice.date }, ${ params.date.format.nice.time }`) }
                                        </Typography>
                                      </div>

                                      {/* Name */}
                                      <div className={classes.item}>
                                        <Typography variant={'caption'} gutterBottom>
                                          Interviewer Name
                                        </Typography>

                                        <Typography gutterBottom>
                                          { interviewerId.name }
                                        </Typography>
                                      </div>

                                      {/* Email */}
                                      <div className={classes.item}>
                                        <Typography variant={'caption'} gutterBottom>
                                          Interviewer Email
                                        </Typography>

                                        <Typography gutterBottom>
                                          { interviewerId.email }
                                        </Typography>
                                      </div>

                                      {/* Mobile */}
                                      <div className={classes.item}>
                                        <Typography variant={'caption'} gutterBottom>
                                          Interviewer Mobile
                                        </Typography>

                                        <Typography gutterBottom>
                                          { interviewerId.mobile }
                                        </Typography>
                                      </div>
                                    </div>
                                  )) }
                                </div>
                              : <EmptyMessage message={'No interview has been scheduled for this candidate.'} />
                          }
                        </React.Fragment>
                    }[tab]
                  }


                </div>
              </React.Fragment>
        }

        <div className={classes.action}>
          <Tooltip title={'Close'} placement={'top'} enterDelay={500}>
            <IconButton
              aria-label={'Close'}
              onClick={toggleDrawer(false)}
            >
              <IconClose />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    )
  }
}

// Component Properties
Details.propTypes = {
  classes: PropTypes.object.isRequired,
  kanbanId: PropTypes.string,
  toggleDrawer: PropTypes.func.isRequired,
  kanban: PropTypes.object.isRequired,
  get: PropTypes.func.isRequired,
}

// Component State
function detailsState(state) {
  return {
    kanban: state.kanban
  }
}

export default connect(detailsState, { get })(withStyles(styles)(Details))
