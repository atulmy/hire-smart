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
  EDIT_UNSET,
  DASHBOARD_SET,
  DASHBOARD_UNSET
} from './actions/types'

// List

// Initial State
const projectsInitialState = {
  isLoading: false,
  list: []
}

// State
export const projects = (state = projectsInitialState, action) => {
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
      return { ...projectsInitialState }

    default:
      return state
  }
}


// Single

// Initial State
const projectInitialState = {
  isLoading: false,
  item: {}
}

// State
export const project = (state = projectInitialState, action) => {
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
      return {
        ...state,
        ...projectInitialState
      }

    default:
      return state
  }
}


// Edit

// Initial State
const projectEditState = {
  project: null,
  open: true
}

// State
export const projectEdit = (state = projectEditState, { type, project }) => {
  switch (type) {
    case EDIT_SET:
      return {
        ...state,
        project,
        open: true
      }

    case EDIT_UNSET:
      return {
        ...state,
        ...projectEditState
      }

    default:
      return state
  }
}


// Dashboard

// Initial State
const projectDashboardState = {
  project: null,
}

// State
export const projectDashboard = (state = projectDashboardState, { type, project }) => {
  switch (type) {
    case DASHBOARD_SET:
      return {
        ...state,
        project
      }

    case DASHBOARD_UNSET:
      return {
        ...state,
        ...projectDashboardState
      }

    default:
      return state
  }
}
