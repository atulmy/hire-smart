// Imports
import React from 'react'

// UI Imports
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button'
import { withStyles } from 'material-ui/styles'
import styles from './styles'

// App Imports

// Component
const Home = (props) => (
  <div>
    <div className={props.classes.hero}>
      <Typography
        variant="display4"
        title={'Hire Smart'}
        className={props.classes.title}
      >
        Hire<spam className={props.classes.titleHighlight}>Smart</spam>
      </Typography>

      <Typography
        variant="headline"
        gutterBottom
        className={props.classes.subTitle}
      >
        Schedule and manage interviews efficiently.
      </Typography>

      <Button
        variant="raised"
        className={props.classes.button}
      >
        Start Now
      </Button>

      <Typography
        variant="caption"
        gutterBottom
        className={props.classes.buttonCaption}
      >
        login not required
      </Typography>
    </div>

    <div className={props.classes.features}>
      <div style={{ flex: 1, flexDirection: 'row' }}>
        <div style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <h1>Hello</h1>

          <p>Hello world</p>
        </div>

        <div style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <img src={`/images/features/features-journey.png`} style={{ boxShadow: '0px 5px 8px rgba(0, 0, 0, 0.5)' }} />
        </div>
      </div>
    </div>
  </div>
)

export default withStyles(styles)(Home)
