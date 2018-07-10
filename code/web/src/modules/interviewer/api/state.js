// Imports

// App Imports
import {
  LIST_REQUEST,
  LIST_RESPONSE,
  LIST_DONE,
  LIST_RESET,
  LIST_BY_PROJECT_REQUEST,
  LIST_BY_PROJECT_RESPONSE,
  LIST_BY_PROJECT_DONE,
  LIST_BY_PROJECT_RESET,
  SINGLE_REQUEST,
  SINGLE_RESPONSE,
  SINGLE_DONE,
  SINGLE_RESET,
  EDIT_SET,
  EDIT_UNSET
} from './actions/types'

// List

// Initial State
const interviewersInitialState = {
  isLoading: false,
  list: []
}

// State
export const interviewers = (state = interviewersInitialState, action) => {
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
      return { ...interviewersInitialState }

    default:
      return state
  }
}


// Single

// Initial State
const interviewerInitialState = {
  isLoading: false,
  item: {}
}

// State
export const interviewer = (state = interviewerInitialState, action) => {
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
      return { ...interviewerInitialState }

    default:
      return state
  }
}

// List by Project

// Initial State
const interviewerByProjectInitialState = {
  isLoading: false,
  list: []
}

// State
export const interviewersByProject = (state = interviewerByProjectInitialState, action) => {
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
      return { ...interviewersInitialState }

    default:
      return state
  }
}

// Edit

// Initial State
const interviewerEditState = {
  edit: {
    interviewer: null,
    open: true
  }
}

// State
export const interviewerEdit = (state = interviewerEditState, action) => {
  switch (action.type) {
    case EDIT_SET:
      return {
        ...state,
        interviewer: action.interviewer,
        open: true
      }

    case EDIT_UNSET:
      return {
        ...state,
        interviewer: null,
        open: true
      }

    default:
      return state
  }
}
