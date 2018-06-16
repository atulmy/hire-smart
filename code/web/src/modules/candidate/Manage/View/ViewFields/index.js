// Imports
import React from 'react'
import PropTypes from 'prop-types'

// UI Imports
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles/index'
import styles from './styles'

// App Imports
import { plural } from '../../../../../setup/helpers'

// Component
const ViewFields = (props) => {
  const { classes, candidate } = props

  return (
    <React.Fragment>
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

      {
        candidate.jobId && candidate.jobId.role &&
        <React.Fragment>
          {/* Job Role */}
          <div className={classes.item}>
            <Typography variant={'caption'} gutterBottom>
              Job Role
            </Typography>

            <Typography gutterBottom>
              { candidate.jobId.role }
            </Typography>
          </div>

          {/* Job Description */}
          <div className={classes.item}>
            <Typography variant={'caption'} gutterBottom>
              Job Description
            </Typography>

            <Typography gutterBottom>
              { candidate.jobId.description }
            </Typography>
          </div>
        </React.Fragment>
      }

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
          { candidate.experience } year{ plural(candidate.experience) }
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
    </React.Fragment>
  )
}

// Component Properties
ViewFields.propTypes = {
  classes: PropTypes.object.isRequired,
  candidate: PropTypes.object.isRequired
}

export default withStyles(styles)(ViewFields)

