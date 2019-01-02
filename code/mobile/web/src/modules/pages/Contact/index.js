// Imports
import React from 'react'
import PropTypes from 'prop-types'

// UI Imports
import Typography from '@material-ui/core/Typography/Typography'
import { withStyles } from '@material-ui/core/styles/index'
import styles from './styles'

// App Imports
import { CONTACT_PHONE, CONTACT_EMAIL, CONTACT_ADDRESS } from '../../../setup/config/env'
import Body from '../../common/Body'
import Header from '../../common/Header'
import ActionBack from '../../common/Header/ActionBack'
import Section from '../../common/Section'

// Component
const Dashboard = ({ classes }) => (
  <Body>
    <Header
      title={'Contact'}
      leftIcon={
        <ActionBack />
      }
    />

    <Section>
      <Typography>We are available 24x7, 365 days a year. Please feel free to get in touch via any of following way:</Typography>

      <div style={{ marginTop: 20 }}>
        <div className={classes.item}>
          <Typography variant={'caption'} color="textSecondary" gutterBottom>
            Email
          </Typography>

          <Typography gutterBottom>
            <a href={`mailto:${ CONTACT_EMAIL }`} target="_blank" rel="noopener noreferrer">{ CONTACT_EMAIL }</a>
          </Typography>
        </div>

        <div className={classes.item}>
          <Typography variant={'caption'} color="textSecondary" gutterBottom>
            Mobile
          </Typography>

          <Typography gutterBottom>
            { CONTACT_PHONE }
          </Typography>
        </div>

        <div className={classes.item}>
          <Typography variant={'caption'} color="textSecondary" gutterBottom>
            Address
          </Typography>

          <Typography gutterBottom>
            { CONTACT_ADDRESS }
          </Typography>
        </div>
      </div>
    </Section>
  </Body>
)

// Component Properties
Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Dashboard)

