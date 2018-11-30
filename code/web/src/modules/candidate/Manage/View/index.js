// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// UI Imports
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import IconClose from '@material-ui/icons/Close'
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'

// App Imports
import { viewHide } from '../../api/actions/mutation'
import ViewFields from './ViewFields'

// Component
class View extends PureComponent {
  render() {
    const { classes, candidateView: { candidate }, viewHide } = this.props

    return (
      <div className={classes.root}>
        <Typography
          variant={'subtitle1'}
          color={'inherit'}
          className={classes.title}
        >
          Candidate Info
        </Typography>

        <ViewFields candidate={candidate} />

        <div style={{ textAlign: 'right' }}>
          <Tooltip title={'Close'} placement={'top'} enterDelay={500}>
            <IconButton
              aria-label={'Close'}
              onClick={viewHide}
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
View.propTypes = {
  candidateView: PropTypes.object.isRequired,
  viewHide: PropTypes.func.isRequired
}

// Component State
function viewState(state) {
  return {
    candidateView: state.candidateView
  }
}

export default connect(viewState, { viewHide })(withStyles(styles)(View))
