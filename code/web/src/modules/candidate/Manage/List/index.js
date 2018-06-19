// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// UI Imports
import Drawer from '@material-ui/core/Drawer'
import Fade from '@material-ui/core/Fade'
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'

// App Imports
import { getList } from '../../api/actions/query'
import { edit, view, viewHide } from '../../api/actions/mutation'
import Loading from '../../../common/Loading'
import View from '../View'
import ListTable from './ListTable'

// Component
class List extends PureComponent {
  constructor() {
    super()

    this.state = {
      drawerView: false
    }
  }
  
  componentDidMount() {
    this.refresh()
  }

  refresh = (isLoading = true) => {
    const { getList } = this.props

    getList(isLoading)
  }

  edit = candidate => () => {
    const { edit } = this.props

    edit(candidate)
  }

  view = candidate => () => {
    const { view } = this.props

    view(candidate)
  }

  render() {
    const { classes, candidates, candidateView, viewHide } = this.props
    const { isLoading, list } = candidates

    return (
      <div className={classes.root}>
        {
          isLoading
            ? <Loading />
            : <Fade in={true}>
                <ListTable
                  list={list}
                  edit={this.edit}
                  view={this.view}
                />
              </Fade>
        }

        {/* Candidate view */}
        <Drawer
          anchor={'right'}
          open={candidateView.open}
          onClose={viewHide}
          ModalProps={{
            BackdropProps: {
              classes: { root: classes.backdrop }
            }
          }}
        >
          <div className={classes.drawer}>
            { <View /> }
          </div>
        </Drawer>
      </div>
    )
  }
}

// Component Properties
List.propTypes = {
  classes: PropTypes.object.isRequired,
  candidates: PropTypes.object.isRequired,
  candidateView: PropTypes.object.isRequired,
  getList: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  view: PropTypes.func.isRequired,
  viewHide: PropTypes.func.isRequired
}

// Component State
function listState(state) {
  return {
    candidates: state.candidates,
    candidateView: state.candidateView
  }
}

export default connect(listState, { getList, edit, view, viewHide })(withStyles(styles)(List))
