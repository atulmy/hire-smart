// Imports

// App Imports
import {
  INTERVIEWS_GET_LIST_REQUEST,
  INTERVIEWS_GET_LIST_RESPONSE,
  INTERVIEWS_GET_LIST_FAILURE,
  INTERVIEWS_GET_LIST_RESET,
  INTERVIEWS_GET_REQUEST,
  INTERVIEWS_GET_RESPONSE,
  INTERVIEWS_GET_FAILURE,
  INTERVIEWS_EDIT_SET,
  INTERVIEWS_EDIT_UNSET
} from './actions'

// list

// Initial State
const interviewsInitialState = {
  isLoading: false,
  error: null,
  list: []
}

// State
export const interviews = (state = interviewsInitialState, action) => {
  switch (action.type) {
    case INTERVIEWS_GET_LIST_REQUEST:
      return {
        ...state,
        isLoading: action.isLoading,
        error: null
      }

    case INTERVIEWS_GET_LIST_RESPONSE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        list: action.list
      }

    case INTERVIEWS_GET_LIST_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }

    case INTERVIEWS_GET_LIST_RESET:
      return Object.assign({}, interviewsInitialState)

    default:
      return state
  }
}


// Single

// Initial State
const interviewInitialState = {
  isLoading: false,
  error: null,
  item: {}
}

// State
export const interview = (state = interviewInitialState, action) => {
  switch (action.type) {
    case INTERVIEWS_GET_REQUEST:
      return {
        ...state,
        isLoading: action.isLoading,
        error: null
      }

    case INTERVIEWS_GET_RESPONSE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        item: action.item
      }

    case INTERVIEWS_GET_FAILURE:
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
const interviewEditState = {
  edit: {
    interview: null,
    open: true
  }
}

// State
export const interviewEdit = (state = interviewEditState, action) => {
  switch (action.type) {
    case INTERVIEWS_EDIT_SET:
      return {
        ...state,
        interview: action.interview,
        open: true
      }

    case INTERVIEWS_EDIT_UNSET:
      return {
        ...state,
        interview: null,
        open: true
      }

    default:
      return state
  }
}
