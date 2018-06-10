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
  SINGLE_RESET,
  EDIT_SET,
  EDIT_UNSET
} from './actions/types'

// List

// Initial State
const clientsInitialState = {
  isLoading: false,
  list: []
}

// State
export const clients = (state = clientsInitialState, action) => {
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
      return { ...clientsInitialState }

    default:
      return state
  }
}


// Single

// Initial State
const clientInitialState = {
  isLoading: false,
  item: {}
}

// State
export const client = (state = clientInitialState, action) => {
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
      return { ...clientInitialState }

    default:
      return state
  }
}


// Edit

// Initial State
const clientEditState = {
  edit: {
    client: null,
    open: true
  }
}

// State
export const clientEdit = (state = clientEditState, action) => {
  switch (action.type) {
    case EDIT_SET:
      return {
        ...state,
        client: action.client,
        open: true
      }

    case EDIT_UNSET:
      return {
        ...state,
        client: null,
        open: true
      }

    default:
      return state
  }
}
