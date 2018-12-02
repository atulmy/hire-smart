// Imports

// App Imports
import {
  LIST_BY_PROJECT_REQUEST,
  LIST_BY_PROJECT_RESPONSE,
  LIST_BY_PROJECT_DONE,
  LIST_BY_PROJECT_RESET,
  SINGLE_REQUEST,
  SINGLE_RESPONSE,
  SINGLE_DONE,
  SINGLE_RESET
} from './actions/types'

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

// List by Project

// Initial State
const kanbanByProjectInitialState = {
  isLoading: false,
  list: []
}

// State
export const kanbansByProject = (state = kanbanByProjectInitialState, action) => {
  switch (action.type) {
    case LIST_BY_PROJECT_REQUEST:
      return {
        ...state,
        isLoading: action.isLoading
      }

    case LIST_BY_PROJECT_RESPONSE:
      return {
        ...state,
        list: action.list
      }

    case LIST_BY_PROJECT_DONE:
      return {
        ...state,
        isLoading: action.isLoading
      }

    case LIST_BY_PROJECT_RESET:
      return { ...kanbanByProjectInitialState }

    default:
      return state
  }
}
