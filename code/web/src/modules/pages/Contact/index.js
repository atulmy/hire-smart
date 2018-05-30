// Imports
import React from 'react'
import { Helmet } from 'react-helmet'

// UI Imports
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Fade from '@material-ui/core/Fade'
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'

// App Imports

// Component
const Contact = (props) => {
  const { classes } = props
  
  return(
    <Fade in={true}>
      <div>
        {/* Meta tags */}
        <Helmet>
          <title>Contact - HireSmart</title>
        </Helmet>

        <Grid container>
          <Grid item xs={12}>
            <Typography variant={'display1'}>
              Contact
            </Typography>
          </Grid>
        </Grid>
      </div>
    </Fade>
  )
}

export default withStyles(styles)(Contact)
