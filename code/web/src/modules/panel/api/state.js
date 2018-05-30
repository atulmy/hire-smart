// Imports

// App Imports
import {
  PANELS_GET_LIST_REQUEST,
  PANELS_GET_LIST_RESPONSE,
  PANELS_GET_LIST_FAILURE,
  PANELS_GET_LIST_RESET,
  PANELS_GET_REQUEST,
  PANELS_GET_RESPONSE,
  PANELS_GET_FAILURE,
  PANELS_EDIT_SET,
  PANELS_EDIT_UNSET
} from './actions'

// list

// Initial State
const panelsInitialState = {
  isLoading: false,
  error: null,
  list: []
}

// State
export const panels = (state = panelsInitialState, action) => {
  switch (action.type) {
    case PANELS_GET_LIST_REQUEST:
      return {
        ...state,
        isLoading: action.isLoading,
        error: null
      }

    case PANELS_GET_LIST_RESPONSE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        list: action.list
      }

    case PANELS_GET_LIST_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }

    case PANELS_GET_LIST_RESET:
      return Object.assign({}, panelsInitialState)

    default:
      return state
  }
}


// Single

// Initial State
const panelInitialState = {
  isLoading: false,
  error: null,
  item: {}
}

// State
export const panel = (state = panelInitialState, action) => {
  switch (action.type) {
    case PANELS_GET_REQUEST:
      return {
        ...state,
        isLoading: action.isLoading,
        error: null
      }

    case PANELS_GET_RESPONSE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        item: action.item
      }

    case PANELS_GET_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }

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
    case PANELS_EDIT_SET:
      return {
        ...state,
        panel: action.panel,
        open: true
      }

    case PANELS_EDIT_UNSET:
      return {
        ...state,
        panel: null,
        open: true
      }

    default:
      return state
  }
}
