// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// UI Imports
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Drawer from '@material-ui/core/Drawer'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import IconAdd from '@material-ui/icons/Add'
import IconCached from '@material-ui/icons/Cached'
import Fade from '@material-ui/core/Fade'
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'

// App Imports
import { messageShow } from '../../../common/api/actions'
import { getListByClient, editClose } from '../../../candidate/api/actions'
import Loading from '../../../common/Loading'
import EmptyMessage from '../../../common/EmptyMessage'
import CreateOrEdit from '../../../candidate/Manage/CreateOrEdit'

// Component
class Candidates extends PureComponent {

  constructor() {
    super()

    this.state = {
      candidates: [],
      right: false,
    }
  }

  componentDidMount() {
    const { editClose } = this.props

    editClose()

    this.refresh()
  }

  refresh = async (isLoading = true) => {
    this.isLoadingToggle(isLoading)

    const { client, getListByClient, messageShow } = this.props

    try {
      // Get candidate list by clientId
      const response = await getListByClient({ clientId: client.item._id })

      if (response.data.errors && response.data.errors.length > 0) {
        messageShow(response.data.errors[0].message)
      } else {
        this.setState({
          candidates: response.data.data.candidatesByClient
        })
      }
    } catch (error) {
      messageShow('There was some error. Please try again.')
    } finally {
      this.isLoadingToggle(false)
    }
  }

  isLoadingToggle = isLoading => {
    this.setState({
      isLoading
    })
  }

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  render() {
    const { classes, client } = this.props
    const { isLoading, candidates } = this.state

    return (
      <div className={classes.root}>
        {/* Actions */}
        <div style={{ textAlign: 'right' }}>
          <Button onClick={this.toggleDrawer('right', true)}>
            <IconAdd style={{ width: 20, height: 20, marginRight: 5 }} />
            Add
          </Button>

          <Button onClick={this.refresh}>
            <IconCached style={{ width: 20, height: 20, marginRight: 5 }} />
            Refresh
          </Button>
        </div>

        <Divider style={{ marginTop: 5 }} />

        {/* Candidate list */}
        {
          isLoading
            ? <Loading />
            : <Fade in={true}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Mobile</TableCell>
                      <TableCell>Experience</TableCell>
                      <TableCell>Resume</TableCell>
                      <TableCell>Salary Current/Expected</TableCell>
                      <TableCell>Shortlist</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {
                      candidates && candidates.length > 0
                        ? candidates.map(candidate => (
                          <TableRow key={candidate._id}>
                            <TableCell>{ candidate.name }</TableCell>
                            <TableCell>{ candidate.email }</TableCell>
                            <TableCell>{ candidate.mobile }</TableCell>
                            <TableCell>{ candidate.experience }</TableCell>
                            <TableCell>{ candidate.resume }</TableCell>
                            <TableCell>{ candidate.salaryCurrent }/{ candidate.salaryExpected }</TableCell>
                            <TableCell>

                            </TableCell>
                          </TableRow>
                        ))
                        : <TableRow>
                            <TableCell colSpan={7}>
                              <EmptyMessage message={'You have not added any candidates yet.'} />
                            </TableCell>
                          </TableRow>
                    }
                  </TableBody>
                </Table>
              </Fade>
        }

        {/* Candidate create or edit */}
        <Drawer anchor="right" open={this.state.right} onClose={this.toggleDrawer('right', false)}>
          <CreateOrEdit
            elevation={0}
            clientId={client.item._id}
            clientShowLoading={false}
          />
        </Drawer>
      </div>
    )
  }
}

// Component Properties
Candidates.propTypes = {
  classes: PropTypes.object.isRequired,
  client: PropTypes.object.isRequired,
  getListByClient: PropTypes.func.isRequired,
  editClose: PropTypes.func.isRequired,
  messageShow: PropTypes.func.isRequired
}

// Component State
function candidatesState(state) {
  return {
    client: state.client
  }
}

export default connect(candidatesState, { getListByClient, editClose, messageShow })(withStyles(styles)(Candidates))
