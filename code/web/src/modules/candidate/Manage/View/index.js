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

// Component
class View extends PureComponent {
  render() {
    const { classes, candidateView: { candidate }, viewHide } = this.props

    return (
      <div className={classes.root}>
        <Typography
          variant={'subheading'}
          color={'inherit'}
          className={classes.title}
        >
          Candidate Info
        </Typography>

        {/* Name */}
        <div className={classes.item}>
          <Typography variant={'caption'} gutterBottom>
            Name
          </Typography>

          <Typography gutterBottom>
            { candidate.name }
          </Typography>
        </div>

        {/* Client */}
        <div className={classes.item}>
          <Typography variant={'caption'} gutterBottom>
            Client
          </Typography>

          <Typography gutterBottom>
            { candidate.clientId.name }
          </Typography>
        </div>

        {/* Email */}
        <div className={classes.item}>
          <Typography variant={'caption'} gutterBottom>
            Email
          </Typography>

          <Typography gutterBottom>
            { candidate.email }
          </Typography>
        </div>

        {/* Mobile */}
        <div className={classes.item}>
          <Typography variant={'caption'} gutterBottom>
            Mobile
          </Typography>

          <Typography gutterBottom>
            { candidate.mobile }
          </Typography>
        </div>

        {/* Experience */}
        <div className={classes.item}>
          <Typography variant={'caption'} gutterBottom>
            Experience
          </Typography>

          <Typography gutterBottom>
            { candidate.experience }
          </Typography>
        </div>

        {/* Resume */}
        <div className={classes.item}>
          <Typography variant={'caption'} gutterBottom>
            Resume
          </Typography>

          <Typography gutterBottom>
            { candidate.resume }
          </Typography>
        </div>

        {/* Salary Current */}
        <div className={classes.item}>
          <Typography variant={'caption'} gutterBottom>
            Salary Current
          </Typography>

          <Typography gutterBottom>
            { candidate.salaryCurrent }
          </Typography>
        </div>

        {/* Salary Expected */}
        <div className={classes.item}>
          <Typography variant={'caption'} gutterBottom>
            Salary Expected
          </Typography>

          <Typography gutterBottom>
            { candidate.salaryExpected }
          </Typography>
        </div>

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
