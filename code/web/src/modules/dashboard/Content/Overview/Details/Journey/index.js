// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment/moment'

// UI Imports
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'

// App Imports
import params from '../../../../../../setup/config/params'
import { getListByCandidate } from '../../../../../activity/api/actions/query'
import Loading from '../../../../../common/Loading'
import EmptyMessage from '../../../../../common/EmptyMessage'

// Component
class Journey extends PureComponent {
  componentDidMount() {
    const { candidateId, getListByCandidate } = this.props

    getListByCandidate({ candidateId })
  }

  render() {
    const { classes, activitiesByCandidate: { isLoading, list } } = this.props

    return (
      <div>
        {
          isLoading
            ? <Loading />
            : <div className={classes.timeLineContainer}>
                {
                  list && list.length > 0
                    ? list.map((activity, i) => (
                        <div key={activity._id}>
                          <div title={moment(new Date(activity.createdAt)).fromNow()}>
                            <span className={classes.timeLineItemTop}>
                              <span className={classes.timeLineItemTopIcon}>{ i+1 }</span>

                              <span className={classes.timeLineItemTopText}>
                                <Typography variant={'body1'}>{ moment(new Date(activity.createdAt)).format(`${ params.date.format.nice.date }, ${ params.date.format.nice.time }`) }</Typography>
                              </span>
                            </span>

                            <div className={classes.timeLineItemBottom} style={ i === list.length - 1 ? { border: 'none' } : {} }>
                              <div className={classes.timeLineItemBottomText}>
                                <Typography>
                                  { activity.message }
                                </Typography>
                              </div>
                            </div>
                          </div>

                          {
                            i !== list.length - 1 &&
                            <div className={classes.timeLineSeparator}>
                              <span className={classes.timeLineSeparatorLine} />
                            </div>
                          }
                        </div>
                      ))
                    : <div>
                        <p>
                          <EmptyMessage message={'No data to show.'} />
                        </p>
                      </div>
                }
              </div>
        }
      </div>
    )
  }
}

// Component Properties
Journey.propTypes = {
  classes: PropTypes.object.isRequired,
  candidateId: PropTypes.string.isRequired,
  activitiesByCandidate: PropTypes.object.isRequired,
  getListByCandidate: PropTypes.func.isRequired
}

// Component State
function journeyState(state) {
  return {
    activitiesByCandidate: state.activitiesByCandidate,
  }
}

export default connect(journeyState, { getListByCandidate })(withStyles(styles)(Journey))
