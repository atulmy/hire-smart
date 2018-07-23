// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// UI Imports
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import IconDomain from '@material-ui/icons/DomainOutlined'
import { withStyles } from '@material-ui/core/styles'
import Fade from '@material-ui/core/Fade'
import styles from './styles'

// App Imports
import AlignCenterMiddle from '../../common/AlignCenterMiddle'
import Overview from './Overview'
import Jobs from './Jobs'
import Candidates from './Candidates'
import Interviews from './Interviews'
import Interviewer from './Interviewers'
import Activities from './Activities'

export const overviewTabs = {
  overview: {
    key: 'overview',
    label: 'Overview'
  },
  candidates: {
    key: 'candidates',
    label: 'Candidates'
  },
  jobs: {
    key: 'jobs',
    label: 'Jobs'
  },
  interviewer: {
    key: 'interviewer',
    label: 'Interviewers'
  },
  interviews: {
    key: 'interviews',
    label: 'Interviews'
  },
  activities: {
    key: 'activities',
    label: 'Activities'
  }
}

// Component
class Content extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      // Default tab
      tab: overviewTabs.overview.key
    }
  }

  componentWillReceiveProps(nextProps) {
    const { projectDashboard: { project } } = nextProps

    if(project && this.props.projectDashboard.project && project._id !== this.props.projectDashboard.project._id) {
      this.tabSwitch(null, overviewTabs.overview.key)
    }
  }

  tabSwitch = (event, tab) => {
    this.setState({ tab })
  }

  render() {
    const { classes, projectDashboard: { project } } = this.props
    const { tab } = this.state

    return (
      <Fade in={true}>
        <div className={classes.root}>
          {
            project && project._id
              ? <div>
                  <div className={classes.tabs}>
                    <Tabs
                      value={tab}
                      onChange={this.tabSwitch}
                    >
                      { Object.values(overviewTabs).map(item => <Tab key={item.key} label={item.label} value={item.key} style={{ minWidth: 'auto' }} />)}
                    </Tabs>
                  </div>

                  <div className={classes.tabContent}>
                    {
                      {
                        overview: <Overview tabSwitch={this.tabSwitch} />,

                        candidates: <Candidates />,

                        jobs: <Jobs />,

                        interviewer: <Interviewer />,

                        interviews: <Interviews />,

                        activities: <Activities />
                      }[tab]
                    }
                  </div>
                </div>
              : <AlignCenterMiddle>
                  <IconDomain className={classes.messageIcon} />
                  <p className={classes.messageText}>Select a project to begin</p>
                </AlignCenterMiddle>
          }
        </div>
      </Fade>
    )
  }
}

// Component Properties
Content.propTypes = {
  classes: PropTypes.object.isRequired,
  projectDashboard: PropTypes.object.isRequired
}

// Component State
function tabContentState(state) {
  return {
    projectDashboard: state.projectDashboard
  }
}

export default connect(tabContentState, {})(withStyles(styles)(Content))
