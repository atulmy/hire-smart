// App Imports
import {
  LIST_BY_PROJECT_REQUEST, LIST_BY_PROJECT_RESPONSE, LIST_BY_PROJECT_DONE, LIST_BY_PROJECT_RESET,
  SINGLE_REQUEST, SINGLE_RESPONSE, SINGLE_DONE, SINGLE_RESET,
  EDIT_SET, EDIT_UNSET,
  VIEW_SET, VIEW_UNSET, VIEW_HIDE
} from './actions/types'

// Single

// Initial State
const jobInitialState = {
  isLoading: false,
  item: {}
}

// State
export const job = (state = jobInitialState, action) => {
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
      return { ...jobInitialState }

    default:
      return state
  }
}

// List by Project

// Initial State
const jobByProjectInitialState = {
  isLoading: false,
  list: []
}

// State
export const jobsByProject = (state = jobByProjectInitialState, action) => {
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
      return { ...jobByProjectInitialState }

    default:
      return state
  }
}

// Edit

// Initial State
const jobEditState = {
  job: null,
  open: false
}

// State
export const jobEdit = (state = jobEditState, action) => {
  switch (action.type) {
    case EDIT_SET:
      return {
        ...state,
        job: action.job,
        open: true
      }

    case EDIT_UNSET:
      return {
        ...state,
        ...jobEditState
      }

    default:
      return state
  }
}


// View

// Initial State
const jobViewState = {
  job: null,
  open: false
}

// State
export const jobView = (state = jobEditState, action) => {
  switch (action.type) {
    case VIEW_SET:
      return {
        ...state,
        job: action.job,
        open: true
      }

    case VIEW_UNSET:
      return {
        ...state,
        ...jobViewState
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
