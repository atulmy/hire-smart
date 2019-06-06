// UI Imports
import { grey, blue } from '@material-ui/core/colors'

// Component Styles
const styles = theme => ({
  root: {
    padding: theme.spacing(),
    backgroundColor: grey[500]
  },

  timeLineContainer: {
    flexDirection: 'column',
    display: 'flex',
    boxShadow: 'none'
  },

  timeLineItem: {},

  timeLineItemTop: {
    display: 'flex',
    alignItems: 'center'
  },
  timeLineItemTopIcon: {
    borderRadius: '50%',
    height: 24,
    width: 24,
    backgroundColor: blue[500],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.75rem',
    color: 'white'
  },
  timeLineItemTopText: {
    marginLeft: 10
  },

  timeLineItemBottom: {
    marginTop: 8,
    marginLeft: 12,
    borderLeft: `1px solid ${ grey[400] }`,
    paddingLeft: 20,
    paddingRight: 8
  },
  timeLineItemBottomText: {
    height: 'auto',
    display: 'flex'
  },

  timeLineSeparator: {
    padding: '0 0 8px',
    marginLeft: 12,
    flex: '1 1 auto'
  },
  timeLineSeparatorLine: {
    minHeight: 24,
    borderLeft: `1px solid ${ grey[400] }`,
    display: 'block'
  }
})

export default styles
