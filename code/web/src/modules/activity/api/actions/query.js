// Imports
import axios from 'axios'

// App Imports
import { API_URL } from '../../../../setup/config/env'
import { MESSAGE_SHOW } from '../../../common/api/actions'
import {
  ACTIVITY_LIST_BY_ORGANIZATION_CACHE,
  ACTIVITY_LIST_BY_PROJECT_CACHE,
  ACTIVITY_LIST_BY_CANDIDATE_CACHE
} from './cache-keys'
import {
  LIST_BY_ORGANIZATION_REQUEST,
  LIST_BY_ORGANIZATION_RESPONSE,
  LIST_BY_ORGANIZATION_DONE,
  LIST_BY_PROJECT_REQUEST,
  LIST_BY_PROJECT_RESPONSE,
  LIST_BY_PROJECT_DONE,
  LIST_BY_CANDIDATE_REQUEST,
  LIST_BY_CANDIDATE_RESPONSE,
  LIST_BY_CANDIDATE_DONE
} from './types'

// Get by Organization
export function getListByOrganization({ projectId }, isLoading = true, forceRefresh = false) {
  return async dispatch => {
    // Caching
    const CACHE_KEY = `${ ACTIVITY_LIST_BY_ORGANIZATION_CACHE }.${ projectId }`

    try {
      const list = JSON.parse(window.localStorage.getItem(CACHE_KEY))

      if(list && !forceRefresh) {
        dispatch({
          type: LIST_BY_ORGANIZATION_RESPONSE,
          list
        })
      } else {
        dispatch({
          type: LIST_BY_ORGANIZATION_REQUEST,
          isLoading
        })
      }
    } catch(e) {
      dispatch({
        type: LIST_BY_ORGANIZATION_REQUEST,
        isLoading
      })
    }

    try {
      const { data } = await axios.post(API_URL, {
        operation: 'activitiesByOrganization',
        fields: ['_id', 'action', 'message', 'createdAt']
      })

      if(data.errors && data.errors.length > 0) {
        dispatch({
          type: MESSAGE_SHOW,
          message: data.errors[0].message
        })
      } else {
        const list = data.data

        dispatch({
          type: LIST_BY_ORGANIZATION_RESPONSE,
          list
        })

        window.localStorage.setItem(CACHE_KEY, JSON.stringify(list))
      }
    } catch(error) {
      dispatch({
        type: MESSAGE_SHOW,
        message: 'Some error occurred. Please try again.'
      })
    } finally {
      dispatch({
        type: LIST_BY_ORGANIZATION_DONE,
        isLoading: false
      })
    }
  }
}

// Get by Project
export function getListByProject({ projectId }, isLoading = true, forceRefresh = false) {
  return async dispatch => {
    // Caching
    const CACHE_KEY = `${ ACTIVITY_LIST_BY_PROJECT_CACHE }.${ projectId }`

    try {
      const list = JSON.parse(window.localStorage.getItem(CACHE_KEY))

      if(list && !forceRefresh) {
        dispatch({
          type: LIST_BY_PROJECT_RESPONSE,
          list
        })
      } else {
        dispatch({
          type: LIST_BY_PROJECT_REQUEST,
          isLoading
        })
      }
    } catch(e) {
      dispatch({
        type: LIST_BY_PROJECT_REQUEST,
        isLoading
      })
    }

    try {
      const { data } = await axios.post(API_URL, {
        operation: 'activitiesByProject',
        params: { projectId },
        fields: ['_id', 'action', 'message', 'createdAt']
      })

      if(data.errors && data.errors.length > 0) {
        dispatch({
          type: MESSAGE_SHOW,
          message: data.errors[0].message
        })
      } else {
        const list = data.data

        dispatch({
          type: LIST_BY_PROJECT_RESPONSE,
          list
        })

        window.localStorage.setItem(CACHE_KEY, JSON.stringify(list))
      }
    } catch(error) {
      dispatch({
        type: MESSAGE_SHOW,
        message: 'Some error occurred. Please try again.'
      })
    } finally {
      dispatch({
        type: LIST_BY_PROJECT_DONE,
        isLoading: false
      })
    }
  }
}

// Get by Project
export function getListByCandidate({ candidateId }, isLoading = true, forceRefresh = false) {
  return async dispatch => {
    // Caching
    const CACHE_KEY = `${ ACTIVITY_LIST_BY_CANDIDATE_CACHE }.${ candidateId }`

    try {
      const list = JSON.parse(window.localStorage.getItem(CACHE_KEY))

      if(list && !forceRefresh) {
        dispatch({
          type: LIST_BY_CANDIDATE_RESPONSE,
          list
        })
      } else {
        dispatch({
          type: LIST_BY_CANDIDATE_REQUEST,
          isLoading
        })
      }
    } catch(e) {
      dispatch({
        type: LIST_BY_CANDIDATE_REQUEST,
        isLoading
      })
    }

    try {
      const { data } = await axios.post(API_URL, {
        operation: 'activitiesByCandidate',
        params: { candidateId },
        fields: ['_id', 'action', 'message', 'createdAt']
      })

      if(data.errors && data.errors.length > 0) {
        dispatch({
          type: MESSAGE_SHOW,
          message: data.errors[0].message
        })
      } else {
        const list = data.data

        dispatch({
          type: LIST_BY_CANDIDATE_RESPONSE,
          list
        })

        window.localStorage.setItem(CACHE_KEY, JSON.stringify(list))
      }
    } catch(error) {
      dispatch({
        type: MESSAGE_SHOW,
        message: 'Some error occurred. Please try again.'
      })
    } finally {
      dispatch({
        type: LIST_BY_CANDIDATE_DONE,
        isLoading: false
      })
    }
  }
}
