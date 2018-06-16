// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// UI Imports
import Fade from '@material-ui/core/Fade'
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'

// App Imports
import { getList } from '../../api/actions/query'
import { edit, editClose } from '../../api/actions/mutation'
import Loading from '../../../common/Loading'
import ListTable from './ListTable'

// Component
class List extends PureComponent {
  componentDidMount() {
    this.refresh()
  }

  refresh = (isLoading = true) => {
    const { getList } = this.props

    getList(isLoading)
  }

  edit = interviewer => () => {
    const { edit } = this.props

    edit(interviewer)
  }

  render() {
    const { classes, interviewers } = this.props
    const { isLoading, list } = interviewers

    return (
      <div className={classes.root}>
        {
          isLoading
            ? <Loading />
            : <Fade in={true}>
                <ListTable list={list} edit={this.edit} />
              </Fade>
        }
      </div>
    )
  }
}

// Component Properties
List.propTypes = {
  classes: PropTypes.object.isRequired,
  getList: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  editClose: PropTypes.func.isRequired,
}

// Component State
function listState(state) {
  return {
    interviewers: state.interviewers
  }
}

export default connect(listState, { getList, edit, editClose })(withStyles(styles)(List))
