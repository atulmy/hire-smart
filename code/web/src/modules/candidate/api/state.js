// Imports

// App Imports
import {
  CANDIDATES_GET_LIST_REQUEST,
  CANDIDATES_GET_LIST_RESPONSE,
  CANDIDATES_GET_LIST_FAILURE,
  CANDIDATES_GET_LIST_RESET,
  CANDIDATES_GET_REQUEST,
  CANDIDATES_GET_RESPONSE,
  CANDIDATES_GET_FAILURE,
  CANDIDATES_EDIT_SET,
  CANDIDATES_EDIT_UNSET
} from './actions'

// list

// Initial State
const candidatesInitialState = {
  isLoading: false,
  error: null,
  list: []
}

// State
export const candidates = (state = candidatesInitialState, action) => {
  switch (action.type) {
    case CANDIDATES_GET_LIST_REQUEST:
      return {
        ...state,
        isLoading: action.isLoading,
        error: null
      }

    case CANDIDATES_GET_LIST_RESPONSE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        list: action.list
      }

    case CANDIDATES_GET_LIST_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }

    case CANDIDATES_GET_LIST_RESET:
      return Object.assign({}, candidatesInitialState)

    default:
      return state
  }
}


// Single

// Initial State
const candidateInitialState = {
  isLoading: false,
  error: null,
  item: {}
}

// State
export const candidate = (state = candidateInitialState, action) => {
  switch (action.type) {
    case CANDIDATES_GET_REQUEST:
      return {
        ...state,
        isLoading: action.isLoading,
        error: null
      }

    case CANDIDATES_GET_RESPONSE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        item: action.item
      }

    case CANDIDATES_GET_FAILURE:
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
const candidateEditState = {
  edit: {
    candidate: null,
    open: true
  }
}

// State
export const candidateEdit = (state = candidateEditState, action) => {
  switch (action.type) {
    case CANDIDATES_EDIT_SET:
      return {
        ...state,
        candidate: action.candidate,
        open: true
      }

    case CANDIDATES_EDIT_UNSET:
      return {
        ...state,
        candidate: null,
        open: true
      }

    default:
      return state
  }
}
