// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// UI Imports
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import IconDomain from '@material-ui/icons/Domain';
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'

// App Imports
import Loading from '../../../common/Loading'
import AlignCenterMiddle from '../../../common/AlignCenterMiddle'

// Component
class Content extends PureComponent {
  constructor() {
    super()

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
                          overview: <span>Overview</span>,

                          interviews: <span>Interviews</span>,

                          candidates: <span>Candidates</span>,

                          panel: <span>Panel</span>,
                        }[tab]
                      }

                      <p>{ item.name }</p>
                      <p>{ item.description }</p>
                    </div>
                  </div>
                : <AlignCenterMiddle>
                    <IconDomain className={classes.messageIcon} />
                    <p className={classes.messageText}>Select a client to begin</p>
                  </AlignCenterMiddle>
        }
      </div>
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
