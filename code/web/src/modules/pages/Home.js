// Imports
import React from 'react'

// UI Imports
import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm'

// App Imports

// Component Style
const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
    fontSize: 20,
  }
})

// Component
const Home = (props) => (
  <div>
    <h1>Home</h1>

    <Button variant="raised" color="primary" className={props.classes.button}>
      Default

      <AccessAlarmIcon className={props.classes.rightIcon} />
    </Button>
  </div>
)

export default withStyles(styles)(Home)
