// Imports

// App Imports
import {
  LIST_BY_ORGANIZATION_REQUEST,
  LIST_BY_ORGANIZATION_RESPONSE,
  LIST_BY_ORGANIZATION_DONE,
  LIST_BY_ORGANIZATION_RESET,
  LIST_BY_CLIENT_REQUEST,
  LIST_BY_CLIENT_RESPONSE,
  LIST_BY_CLIENT_DONE,
  LIST_BY_CLIENT_RESET
} from './actions/types'

// List by Organization

// Initial State
const activitiesByOrganizationInitialState = {
  isLoading: false,
  list: []
}

// State
export const activitiesByOrganization = (state = activitiesByOrganizationInitialState, action) => {
  switch (action.type) {
    case LIST_BY_ORGANIZATION_REQUEST:
      return {
        ...state,
        isLoading: action.isLoading
      }

    case LIST_BY_ORGANIZATION_RESPONSE:
      return {
        ...state,
        list: action.list
      }

    case LIST_BY_ORGANIZATION_DONE:
      return {
        ...state,
        isLoading: action.isLoading
      }

    case LIST_BY_ORGANIZATION_RESET:
      return { ...activitiesByClientInitialState }

    default:
      return state
  }
}


// List by Client

// Initial State
const activitiesByClientInitialState = {
  isLoading: false,
  list: []
}

// State
export const activitiesByClient = (state = activitiesByClientInitialState, action) => {
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
      return { ...activitiesByClientInitialState }

    default:
      return state
  }
}
