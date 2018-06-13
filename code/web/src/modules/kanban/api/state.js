// Imports

// App Imports
import {
  LIST_REQUEST,
  LIST_RESPONSE,
  LIST_DONE,
  LIST_RESET,
  LIST_BY_CLIENT_REQUEST,
  LIST_BY_CLIENT_RESPONSE,
  LIST_BY_CLIENT_DONE,
  LIST_BY_CLIENT_RESET,
  SINGLE_REQUEST,
  SINGLE_RESPONSE,
  SINGLE_DONE,
  SINGLE_RESET
} from './actions/types'

// List

// Initial State
const kanbansInitialState = {
  isLoading: false,
  list: []
}

// State
export const kanbans = (state = kanbansInitialState, action) => {
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
      return { ...kanbansInitialState }

    default:
      return state
  }
}


// Single

// Initial State
const kanbanInitialState = {
  isLoading: false,
  item: {}
}

// State
export const kanban = (state = kanbanInitialState, action) => {
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
      return { ...kanbanInitialState }

    default:
      return state
  }
}

// List by Client

// Initial State
const kanbanByClientInitialState = {
  isLoading: false,
  list: []
}

// State
export const kanbansByClient = (state = kanbanByClientInitialState, action) => {
  switch (action.type) {
    case LIST_BY_CLIENT_REQUEST:
      return {
        ...state,
        isLoading: action.isLoading
      }

    case LIST_BY_CLIENT_RESPONSE:
      return {
        ...state,
        list: action.list
      }

    case LIST_BY_CLIENT_DONE:
      return {
        ...state,
        isLoading: action.isLoading
      }

    case LIST_BY_CLIENT_RESET:
      return { ...kanbansInitialState }

    default:
      return state
  }
}
