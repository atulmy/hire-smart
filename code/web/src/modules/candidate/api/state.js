// Imports

// App Imports
import {
  CANDIDATES_GET_LIST_REQUEST,
  CANDIDATES_GET_LIST_RESPONSE,
  CANDIDATES_GET_LIST_DONE,
  CANDIDATES_GET_LIST_RESET,
  CANDIDATES_GET_LIST_BY_CLIENT_REQUEST,
  CANDIDATES_GET_LIST_BY_CLIENT_RESPONSE,
  CANDIDATES_GET_LIST_BY_CLIENT_DONE,
  CANDIDATES_GET_LIST_BY_CLIENT_RESET,
  CANDIDATE_GET_REQUEST,
  CANDIDATE_GET_RESPONSE,
  CANDIDATE_GET_DONE,
  CANDIDATE_GET_RESET,
  CANDIDATE_EDIT_SET,
  CANDIDATE_EDIT_UNSET
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
    case CANDIDATES_GET_LIST_REQUEST:
      return {
        ...state,
        isLoading: action.isLoading
      }

    case CANDIDATES_GET_LIST_RESPONSE:
      return {
        ...state,
        list: action.list
      }

    case CANDIDATES_GET_LIST_DONE:
      return {
        ...state,
        isLoading: false
      }

    case CANDIDATES_GET_LIST_RESET:
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
    case CANDIDATE_GET_REQUEST:
      return {
        ...state,
        isLoading: action.isLoading
      }

    case CANDIDATE_GET_RESPONSE:
      return {
        ...state,
        item: action.item
      }

    case CANDIDATE_GET_DONE:
      return {
        ...state,
        isLoading: false
      }

    case CANDIDATE_GET_RESET:
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
    case CANDIDATES_GET_LIST_BY_CLIENT_REQUEST:
      return {
        ...state,
        isLoading: action.isLoading
      }

    case CANDIDATES_GET_LIST_BY_CLIENT_RESPONSE:
      return {
        ...state,
        list: action.list
      }

    case CANDIDATES_GET_LIST_BY_CLIENT_DONE:
      return {
        ...state,
        isLoading: action.isLoading
      }

    case CANDIDATES_GET_LIST_BY_CLIENT_RESET:
      return { ...candidatesInitialState }

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
    case CANDIDATE_EDIT_SET:
      return {
        ...state,
        candidate: action.candidate,
        open: true
      }

    case CANDIDATE_EDIT_UNSET:
      return {
        ...state,
        candidate: null,
        open: true
      }

    default:
      return state
  }
}
