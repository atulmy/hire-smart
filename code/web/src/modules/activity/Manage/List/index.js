// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// UI Imports
import Fade from '@material-ui/core/Fade'
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'

// App Imports
import { getListByOrganization } from '../../api/actions/query'
import Loading from '../../../common/Loading'
import ListTable from './ListTable'

// Component
class List extends PureComponent {
  componentDidMount() {
    this.refresh()
  }

  refresh = (isLoading = true) => {
    const { getListByOrganization } = this.props

    getListByOrganization(isLoading)
  }

  render() {
    const { classes, activitiesByOrganization: { isLoading, list } } = this.props

    return (
      <div className={classes.root}>
        {
          isLoading
            ? <Loading />
            : <Fade in={true}>
                <ListTable list={list} />
              </Fade>
        }
      </div>
    )
  }
}

// Component Properties
List.propTypes = {
  classes: PropTypes.object.isRequired,
  activitiesByOrganization: PropTypes.object.isRequired,
  getListByOrganization: PropTypes.func.isRequired
}

// Component State
function listState(state) {
  return {
    activitiesByOrganization: state.activitiesByOrganization
  }
}

export default connect(listState, { getListByOrganization })(withStyles(styles)(List))
