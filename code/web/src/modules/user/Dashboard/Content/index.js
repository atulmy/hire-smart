// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// UI Imports
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import IconDomain from '@material-ui/icons/Domain'
import { withStyles } from '@material-ui/core/styles'
import Fade from '@material-ui/core/Fade'
import styles from './styles'

// App Imports
import Loading from '../../../common/Loading'
import AlignCenterMiddle from '../../../common/AlignCenterMiddle'
import Overview from './Overview'
import Candidates from './Candidates'
import Panel from './Panel'

// Component
class Content extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      tab: 'overview'
    }
  }

  tabSwitch = (event, tab) => {
    this.setState({ tab })
  }

  render() {
    const { classes, client: { isLoading, item } } = this.props
    const { tab } = this.state

    return (
      <Fade in={true}>
        <div className={classes.root}>
          {
            isLoading
              ? <AlignCenterMiddle>
                  <Loading />
                </AlignCenterMiddle>
              : item && item._id
                  ? <div>
                      <div className={classes.tabs}>
                        <Tabs
                          value={tab}
                          onChange={this.tabSwitch}
                        >
                          <Tab label={'Overview'} value={'overview'} />
                          <Tab label={'Interviews'} value={'interviews'} />
                          <Tab label={'Candidates'} value={'candidates'} />
                          <Tab label={'Panel'} value={'panel'} />
                        </Tabs>
                      </div>

                      <div className={classes.tabContent}>
                        {
                          {
                            overview: <Overview />,

                            interviews: <span>Interviews</span>,

                            candidates: <Candidates />,

                            panel: <Panel />,
                          }[tab]
                        }
                      </div>
                    </div>
                  : <AlignCenterMiddle>
                      <IconDomain className={classes.messageIcon} />
                      <p className={classes.messageText}>Select a client to begin</p>
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
  client: PropTypes.object.isRequired
}

// Component State
function tabContentState(state) {
  return {
    client: state.client
  }
}

export default connect(tabContentState, {})(withStyles(styles)(Content))
