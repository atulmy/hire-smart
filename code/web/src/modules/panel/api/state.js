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
  SINGLE_RESET,
  EDIT_SET,
  EDIT_UNSET
} from './actions/types'

// List

// Initial State
const panelsInitialState = {
  isLoading: false,
  list: []
}

// State
export const panels = (state = panelsInitialState, action) => {
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
      return { ...panelsInitialState }

    default:
      return state
  }
}


// Single

// Initial State
const panelInitialState = {
  isLoading: false,
  item: {}
}

// State
export const panel = (state = panelInitialState, action) => {
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
      return { ...panelInitialState }

    default:
      return state
  }
}

// List by Client

// Initial State
const panelByClientInitialState = {
  isLoading: false,
  list: []
}

// State
export const panelsByClient = (state = panelByClientInitialState, action) => {
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
      return { ...panelsInitialState }

    default:
      return state
  }
}

// Edit

// Initial State
const panelEditState = {
  edit: {
    panel: null,
    open: true
  }
}

// State
export const panelEdit = (state = panelEditState, action) => {
  switch (action.type) {
    case EDIT_SET:
      return {
        ...state,
        panel: action.panel,
        open: true
      }

    case EDIT_UNSET:
      return {
        ...state,
        panel: null,
        open: true
      }

    default:
      return state
  }
}
