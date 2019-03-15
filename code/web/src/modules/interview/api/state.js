// App Imports
import {
  LIST_BY_PROJECT_REQUEST,
  LIST_BY_PROJECT_RESPONSE,
  LIST_BY_PROJECT_DONE,
  LIST_BY_PROJECT_RESET,
  SINGLE_REQUEST,
  SINGLE_RESPONSE,
  SINGLE_DONE,
  SINGLE_RESET,
  EDIT_SET,
  EDIT_UNSET,
  VIEW_HIDE,
  VIEW_SET,
  VIEW_UNSET
} from './actions/types'


// Single

// Initial State
const interviewInitialState = {
  isLoading: false,
  item: {}
}

// State
export const interview = (state = interviewInitialState, action) => {
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
      return { ...interviewInitialState }

    default:
      return state
  }
}

// List by Project

// Initial State
const interviewByProjectInitialState = {
  isLoading: false,
  list: []
}

// State
export const interviewsByProject = (state = interviewByProjectInitialState, action) => {
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
      return { ...interviewByProjectInitialState }

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
    case EDIT_SET:
      return {
        ...state,
        interview: action.interview,
        open: true
      }

    case EDIT_UNSET:
      return {
        ...state,
        interview: null,
        open: true
      }

    default:
      return state
  }
}

// View

// Initial State
const interviewViewState = {
  interview: null,
  open: false
}

// State
export const interviewView = (state = interviewViewState, action) => {
  switch (action.type) {
    case VIEW_SET:
      return {
        ...state,
        interview: action.interview,
        open: true
      }

    case VIEW_UNSET:
      return {
        ...state,
        ...interviewViewState
      }

    case VIEW_HIDE:
      return {
        ...state,
        open: false
      }

    default:
      return state
  }
}
