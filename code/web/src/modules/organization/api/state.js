// Imports

// App Imports
import {
  LIST_REQUEST,
  LIST_RESPONSE,
  LIST_DONE,
  LIST_RESET,
  SINGLE_REQUEST,
  SINGLE_RESPONSE,
  SINGLE_DONE,
  SINGLE_RESET
} from './actions/types'

// List

// Initial State
const organizationsInitialState = {
  isLoading: false,
  list: []
}

// State
export const organizations = (state = organizationsInitialState, action) => {
  switch (action.type) {
    case LIST_REQUEST:
      return {
        ...state,
        isLoading: action.isLoading
      }

    case LIST_RESPONSE:
      return {
        ...state,
        list: action.list
      }

    case LIST_DONE:
      return {
        ...state,
        isLoading: false
      }

    case LIST_RESET:
      return { ...organizationsInitialState }

    default:
      return state
  }
}


// Single

// Initial State
const organizationInitialState = {
  isLoading: false,
  item: {}
}

// State
export const organization = (state = organizationInitialState, action) => {
  switch (action.type) {
    case SINGLE_REQUEST:
      return {
        ...state,
        isLoading: action.isLoading
      }

    case SINGLE_RESPONSE:
      return {
        ...state,
        item: action.item
      }

    case SINGLE_DONE:
      return {
        ...state,
        isLoading: false
      }

    case SINGLE_RESET:
      return { ...organizationInitialState }

    default:
      return state
  }
}

