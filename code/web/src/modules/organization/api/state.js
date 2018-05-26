// Imports

// App Imports
import {
  ORGANIZATIONS_GET_LIST_REQUEST,
  ORGANIZATIONS_GET_LIST_RESPONSE,
  ORGANIZATIONS_GET_LIST_FAILURE,
  ORGANIZATIONS_GET_LIST_RESET,
  ORGANIZATIONS_GET_REQUEST,
  ORGANIZATIONS_GET_RESPONSE,
  ORGANIZATIONS_GET_FAILURE
} from './actions'

// list

// Initial State
const organizationsInitialState = {
  isLoading: false,
  error: null,
  list: []
}

// State
export const organizations = (state = organizationsInitialState, action) => {
  switch (action.type) {
    case ORGANIZATIONS_GET_LIST_REQUEST:
      return {
        ...state,
        isLoading: action.isLoading,
        error: null
      }

    case ORGANIZATIONS_GET_LIST_RESPONSE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        list: action.list
      }

    case ORGANIZATIONS_GET_LIST_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }

    case ORGANIZATIONS_GET_LIST_RESET:
      return Object.assign({}, organizationsInitialState)

    default:
      return state
  }
}


// Single

// Initial State
const organizationInitialState = {
  isLoading: false,
  error: null,
  item: {}
}

// State
export const organization = (state = organizationInitialState, action) => {
  switch (action.type) {
    case ORGANIZATIONS_GET_REQUEST:
      return {
        ...state,
        isLoading: action.isLoading,
        error: null
      }

    case ORGANIZATIONS_GET_RESPONSE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        item: action.item
      }

    case ORGANIZATIONS_GET_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }

    default:
      return state
  }
}
