// Imports
import axios from 'axios'

// App Imports
import { API_URL } from '../../../../setup/config/env'
import { MESSAGE_SHOW } from '../../../common/api/actions'
import { CANDIDATE_LIST_CACHE, CANDIDATE_SINGLE_CACHE, CANDIDATE_LIST_BY_PROJECT_CACHE } from './cache-keys'
import {
  LIST_REQUEST,
  LIST_RESPONSE,
  LIST_DONE,
  SINGLE_REQUEST,
  SINGLE_RESPONSE,
  SINGLE_DONE,
  LIST_BY_PROJECT_REQUEST,
  LIST_BY_PROJECT_RESPONSE,
  LIST_BY_PROJECT_DONE
} from './types'

// Get list
export function getList(isLoading = true) {
  return async dispatch => {
    // Caching
    try {
      const list = JSON.parse(window.localStorage.getItem(CANDIDATE_LIST_CACHE))

      if(list && list.length > 0) {
        dispatch({
          type: LIST_RESPONSE,
          list
        })
      } else {
        dispatch({
          type: LIST_REQUEST,
          isLoading
        })
      }
    } catch(e) {
      dispatch({
        type: LIST_REQUEST,
        isLoading
      })
    }

    // Get data
    try {
      const { data } = await axios.post(API_URL, {
        operation: 'candidatesByOrganization',
        fields: {
          candidate: ['_id', 'name', 'email', 'mobile', 'experience', 'resume', 'salaryCurrent', 'salaryExpected', 'createdAt'],
          project: ['_id', 'name'],
          job: ['_id', 'role', 'description']
        }
      })

      if(data.errors && data.errors.length > 0) {
        dispatch({
          type: MESSAGE_SHOW,
          message: data.errors[0].message
        })
      } else {
        const list = data.data

        dispatch({
          type: LIST_RESPONSE,
          list
        })

        window.localStorage.setItem(CANDIDATE_LIST_CACHE, JSON.stringify(list))
      }
    } catch(error) {
      dispatch({
        type: MESSAGE_SHOW,
        message: 'Some error occurred. Please try again.'
      })
    } finally {
      dispatch({
        type: LIST_DONE,
        isLoading: false
      })
    }
  }
}

// Get single
export function get(candidateId, isLoading = true) {
  return async dispatch => {
    // Caching
    const CACHE_KEY = `${ CANDIDATE_SINGLE_CACHE }.${ candidateId }`

    try {
      const item = JSON.parse(window.localStorage.getItem(CACHE_KEY))

      if(item) {
        dispatch({
          type: SINGLE_RESPONSE,
          item
        })
      } else {
        dispatch({
          type: SINGLE_REQUEST,
          isLoading
        })
      }
    } catch(e) {
      dispatch({
        type: SINGLE_REQUEST,
        isLoading
      })
    }

    // Get data
    try {
      const { data } = await axios.post(API_URL, {
        operation: 'candidate',
        params: { id: candidateId },
        fields: {
          candidate: ['_id', 'name', 'email', 'mobile', 'experience', 'resume', 'salaryCurrent', 'salaryExpected', 'createdAt'],
          project: ['_id', 'name'],
          job: ['_id', 'role', 'description']
        }
      })

      if(data.errors && data.errors.length > 0) {
        dispatch({
          type: MESSAGE_SHOW,
          message: data.errors[0].message
        })
      } else {
        const item = data.data

        dispatch({
          type: SINGLE_RESPONSE,
          item
        })

        window.localStorage.setItem(CACHE_KEY, JSON.stringify(item))
      }
    } catch(error) {
      dispatch({
        type: MESSAGE_SHOW,
        message: 'Some error occurred. Please try again.'
      })
    } finally {
      dispatch({
        type: SINGLE_DONE,
        isLoading: false
      })
    }
  }
}

// Get by Project
export function getListByProject({ projectId }, isLoading = true, forceRefresh = false) {
  return async dispatch => {
    // Caching
    const CACHE_KEY = `${ CANDIDATE_LIST_BY_PROJECT_CACHE }.${ projectId }`

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

    // Get data
    try {
      const { data } = await axios.post(API_URL, {
        operation: 'candidatesByProject',
        params: { projectId },
        fields: {
          candidate: ['_id', 'name', 'email', 'mobile', 'experience', 'resume', 'salaryCurrent', 'salaryExpected', 'createdAt'],
          project: ['_id', 'name'],
          job: ['_id', 'role', 'description']
        }
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
