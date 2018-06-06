// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// UI Imports
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Fade from '@material-ui/core/Fade'
import grey from '@material-ui/core/colors/grey'
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'

// App Imports
import params from '../../../../../setup/config/params'
// import { someAction } from './api/actions'

// Component
class Overview extends PureComponent {

  constructor(props) {
    super(props)

    this.state = {}
  }

  componentDidMount() {
    // const { someAction } = this.props
  }

  columnWidth = () => {
    let width = parseInt((window.innerWidth - 298) / params.kanban.columns.length, 10) - 1
    if(width < 225) {
      width = 225
    }
    return width
  }

  render() {
    const { classes } = this.props
    const { kanban: { columns } } = params

    return (
      <Fade in={true}>
        <div style={{ position: 'relative' }}>
          <div style={{ overflowX: 'auto', overflowY: 'hidden', position: 'relative', width: 'calc(100vw - 298px)' }}>
            <div style={{ width: (this.columnWidth() * columns.length) + columns.length, display: 'inline-block', height: 'calc(100vh - 201px)' }}>
              { columns.map((column, i) => (
                <div
                  key={column.key}
                  style={{ width: this.columnWidth(), display: 'inline-block', float: 'left', height: 'calc(100vh - 196px)', overflowY: 'hidden', borderRight: i !== (columns.length - 1) ? `1px solid ${ grey[200] }` : '' }}
                >
                  <div style={{ textAlign: 'center', borderBottom: `2px solid ${ column.color }`, margin: '0 20px', paddingBottom: 10 }}>
                    <Typography variant="button" style={{ color: grey[800], textTransform: 'uppercase', fontWeight: 400, fontSize: '0.75rem' }}>
                      { column.name } (5)
                    </Typography>
                  </div>

                  <div style={{ padding: '0 20px', height: 'calc(100vh - 223px)', overflowY: 'auto' }}>
                    {
                      i === 0 &&
                      <Paper style={{ margin: '20px 0', padding: '10px', cursor: 'pointer' }}>
                        <Typography variant="title">
                          Jon Snow 1
                        </Typography>
                        <Typography>
                          Panel: Tyrion Lannister
                        </Typography>
                        <Typography color="textSecondary">
                          5.5 years
                        </Typography>
                        <Typography color="textSecondary">
                          9930306893
                        </Typography>
                      </Paper>
                    }
                  </div>
                </div>
              )) }
            </div>
          </div>
        </div>
      </Fade>
    )
  }
}

// Component Properties
Overview.propTypes = {
  classes: PropTypes.object.isRequired,
  // someAction: PropTypes.func.isRequired,
}

// Component State
function overviewState(state) {
  return {
    common: state.common
  }
}

export default connect(overviewState, { /* someAction */ })(withStyles(styles)(Overview))
