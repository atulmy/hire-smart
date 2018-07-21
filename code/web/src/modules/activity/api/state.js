// Imports

// App Imports
import {
  LIST_BY_ORGANIZATION_REQUEST,
  LIST_BY_ORGANIZATION_RESPONSE,
  LIST_BY_ORGANIZATION_DONE,
  LIST_BY_ORGANIZATION_RESET,
  LIST_BY_PROJECT_REQUEST,
  LIST_BY_PROJECT_RESPONSE,
  LIST_BY_PROJECT_DONE,
  LIST_BY_PROJECT_RESET,
  LIST_BY_CANDIDATE_REQUEST,
  LIST_BY_CANDIDATE_RESPONSE,
  LIST_BY_CANDIDATE_DONE,
  LIST_BY_CANDIDATE_RESET
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
      return { ...activitiesByProjectInitialState }

    default:
      return state
  }
}


// List by Project

// Initial State
const activitiesByProjectInitialState = {
  isLoading: false,
  list: []
}

// State
export const activitiesByProject = (state = activitiesByProjectInitialState, action) => {
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
      return { ...activitiesByProjectInitialState }

    default:
      return state
  }
}


// List by Candidate

// Initial State
const activitiesByCandidateInitialState = {
  isLoading: false,
  list: []
}

// State
export const activitiesByCandidate = (state = activitiesByCandidateInitialState, action) => {
  switch (action.type) {
    case LIST_BY_CANDIDATE_REQUEST:
      return {
        ...state,
        isLoading: action.isLoading
      }

    case LIST_BY_CANDIDATE_RESPONSE:
      return {
        ...state,
        list: action.list
      }

    case LIST_BY_CANDIDATE_DONE:
      return {
        ...state,
        isLoading: action.isLoading
      }

    case LIST_BY_CANDIDATE_RESET:
      return { ...activitiesByCandidateInitialState }

    default:
      return state
  }
}
