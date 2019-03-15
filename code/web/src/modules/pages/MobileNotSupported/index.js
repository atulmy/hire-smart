// Imports
import React from 'react'
import { Helmet } from 'react-helmet'

// UI Imports
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'

// Component
const MobileNotSupported = (props) => {
  const { classes } = props
  
  return(
    <div>
      {/* Meta tags */}
      <Helmet>
        <title>Mobile Not Supported - HireSmart</title>
      </Helmet>

      <div className={classes.content}>
        <Typography
          color={'inherit'}
          className={classes.caption}
        >
          Sorry, at this time we do not support mobile phones.
        </Typography>
      </div>
    </div>
  )
}

export default withStyles(styles)(MobileNotSupported)
