// App Imports
import {
  LIST_REQUEST, LIST_RESPONSE, LIST_DONE, LIST_RESET,
  LIST_BY_CLIENT_REQUEST, LIST_BY_CLIENT_RESPONSE, LIST_BY_CLIENT_DONE, LIST_BY_CLIENT_RESET,
  SINGLE_REQUEST, SINGLE_RESPONSE, SINGLE_DONE, SINGLE_RESET,
  EDIT_SET, EDIT_UNSET,
  VIEW_SET, VIEW_UNSET, VIEW_HIDE
} from './actions/types'

// List

// Initial State
const candidatesInitialState = {
  isLoading: false,
  list: []
}

// State
export const candidates = (state = candidatesInitialState, action) => {
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
      return { ...candidatesInitialState }

    default:
      return state
  }
}


// Single

// Initial State
const candidateInitialState = {
  isLoading: false,
  item: {}
}

// State
export const candidate = (state = candidateInitialState, action) => {
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
      return { ...candidateInitialState }

    default:
      return state
  }
}

// List by Client

// Initial State
const candidateByClientInitialState = {
  isLoading: false,
  list: []
}

// State
export const candidatesByClient = (state = candidateByClientInitialState, action) => {
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
      return { ...candidatesInitialState }

    default:
      return state
  }
}

// Edit

// Initial State
const candidateEditState = {
  candidate: null,
  open: false
}

// State
export const candidateEdit = (state = candidateEditState, action) => {
  switch (action.type) {
    case EDIT_SET:
      return {
        ...state,
        candidate: action.candidate,
        open: true
      }

    case EDIT_UNSET:
      return {
        ...state,
        ...candidateEditState
      }

    default:
      return state
  }
}


// View

// Initial State
const candidateViewState = {
  candidate: null,
  open: false
}

// State
export const candidateView = (state = candidateEditState, action) => {
  switch (action.type) {
    case VIEW_SET:
      return {
        ...state,
        candidate: action.candidate,
        open: true
      }

    case VIEW_UNSET:
      return {
        ...state,
        ...candidateViewState
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
