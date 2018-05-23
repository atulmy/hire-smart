// App Imports
import { DRAWER_SHOW, DRAWER_HIDE, MESSAGE_SHOW, MESSAGE_HIDE } from './actions'

// Initial State
export const commonInitialState = {
  drawerVisible: false,

  message: {
    text: null,
    open: false
  }
}

// State
export default (state = commonInitialState, action) => {
  switch (action.type) {
    case DRAWER_SHOW:
      return {
        ...state,
        drawerVisible: true
      }

    case DRAWER_HIDE:
      return {
        ...state,
        drawerVisible: false
      }

    case MESSAGE_SHOW:
      return {
        ...state,
        message: {
          text: action.message,
          open: true
        }
      }

    case MESSAGE_HIDE:
      return {
        ...state,
        message: {
          text: null,
          open: false
        }
      }

    default:
      return state
  }
}
