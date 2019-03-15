// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// UI Imports
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import IconClose from '@material-ui/icons/Close'
import IconRadioButtonChecked from '@material-ui/icons/RadioButtonChecked'
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'

// App Imports
import params from '../../../../../setup/config/params'
import { messageShow } from '../../../../common/api/actions'
import { get } from '../../../../kanban/api/actions/query'
import { remind } from '../../../../interview/api/actions/mutation'
import Loading from '../../../../common/Loading'
import EmptyMessage from '../../../../common/EmptyMessage'
import CandidateViewFields from '../../../../candidate/Manage/View/ViewFields'
import InterviewViewFields from '../../../../interview/Manage/View/ViewFields'
import Journey from './Journey'

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

  modeName = (mode) => {
    return params.interview.modes.filter(item => item.key === mode)[0].name
  }

  remind = interview => async () => {
    const { user, messageShow, remind } = this.props

    if(user.isAuthenticated && user.details.demo) {
      messageShow('Sorry, to perform this action you need to verify your account.')
    } else {
      let check = window.confirm('Are you sure you want to send reminder email to the candidate and interviewer?')

      if (check) {
        messageShow('Sending reminder emails, please wait..')

        try {
          const {data} = await remind({id: interview._id})

          if (data.errors && data.errors.length > 0) {
            messageShow(data.errors[0].message)
          } else {
            messageShow('Reminder emails sent successfully.')
          }
        } catch (error) {
          messageShow('There was some error. Please try again.')
        }
      }
    }
  }

  render() {
    const { classes, kanban: { isLoading, item: { candidateId, interviews, status } }, toggleDrawer } = this.props
    const { tab } = this.state

    return (
      <div>
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
                    <Tab label={'Journey'} value={'journey'} style={{ minWidth: 'auto' }} />
                  </Tabs>
                </div>

                <div className={classes.tabContent}>
                  {
                    {
                      candidate: candidateId && candidateId._id &&
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

                          <CandidateViewFields candidate={candidateId} />
                        </div>,

                      interview: interviews && interviews.length > 0
                        ? interviews.map((interview, i) => (
                            <div key={interview._id} className={classes.interview} style={ i === interviews.length - 1 ? { marginBottom: 0 } : {} }>
                              <div className={classes.interviewNumber}>
                                <Typography variant={'button'}>
                                  Interview #{ i+1 }
                                </Typography>
                              </div>

                              <div className={classes.interviewContent}>
                                <InterviewViewFields interview={interview} />

                                {
                                  !interview.feedbackId &&
                                  <div className={classes.interviewContentActions}>
                                    <Button
                                      color={'primary'}
                                      onClick={this.remind(interview)}
                                    >
                                      Remind
                                    </Button>
                                  </div>
                                }
                              </div>
                            </div>
                          ))
                        : <EmptyMessage message={'No interview has been scheduled for this candidate.'} />,

                      journey: candidateId && candidateId._id && <Journey candidateId={candidateId._id} />
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
  user: PropTypes.object.isRequired,
  get: PropTypes.func.isRequired,
  remind: PropTypes.func.isRequired,
  messageShow: PropTypes.func.isRequired
}

// Component State
function detailsState(state) {
  return {
    kanban: state.kanban,
    user: state.user
  }
}

export default connect(detailsState, { get, remind, messageShow })(withStyles(styles)(Details))
