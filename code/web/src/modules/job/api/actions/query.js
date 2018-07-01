// Imports
import axios from 'axios'

// App Imports
import { API_URL } from '../../../../setup/config/env'
import { queryBuilder } from '../../../../setup/helpers'
import { MESSAGE_SHOW } from '../../../common/api/actions'
import { JOB_LIST_CACHE, JOB_SINGLE_CACHE, JOB_LIST_BY_CLIENT_CACHE } from './cache-keys'
import {
  LIST_REQUEST,
  LIST_RESPONSE,
  LIST_DONE,
  SINGLE_REQUEST,
  SINGLE_RESPONSE,
  SINGLE_DONE,
  LIST_BY_CLIENT_REQUEST,
  LIST_BY_CLIENT_RESPONSE,
  LIST_BY_CLIENT_DONE
} from './types'

// Get list
export function getList(isLoading = true) {
  return async dispatch => {
    // Caching
    try {
      const list = JSON.parse(window.localStorage.getItem(JOB_LIST_CACHE))

      if(list) {
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
    
    try {
      const { data } = await axios.post(API_URL, queryBuilder({
        type: 'query',
        operation: 'jobsByOrganization',
        fields: ['_id', 'clientId { _id, name }', 'role', 'description', 'createdAt']
      }))

      if(data.errors && data.errors.length > 0) {
        dispatch({
          type: MESSAGE_SHOW,
          message: data.errors[0].message
        })
      } else {
        const list = data.data.jobsByOrganization

        dispatch({
          type: LIST_RESPONSE,
          list
        })

        window.localStorage.setItem(JOB_LIST_CACHE, JSON.stringify(list))
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
export function get(jobId, isLoading = true) {
  return async dispatch => {
    // Caching
    const CACHE_KEY = `${ JOB_SINGLE_CACHE }.${ jobId }`

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

    try {
      const { data } = await axios.post(API_URL, queryBuilder({
        type: 'query',
        operation: 'job',
        data: { id: jobId },
        fields: ['_id', 'clientId { _id, name }', 'role', 'description', 'createdAt']
      }))

      if(data.errors && data.errors.length > 0) {
        dispatch({
          type: MESSAGE_SHOW,
          message: data.errors[0].message
        })
      } else {
        const item = data.data.job

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

// Get by Client
export function getListByClient({ clientId }, isLoading = true, forceRefresh = false) {
  return async dispatch => {
    // Caching
    const CACHE_KEY = `${ JOB_LIST_BY_CLIENT_CACHE }.${ clientId }`

    try {
      const list = JSON.parse(window.localStorage.getItem(CACHE_KEY))

      if(list && !forceRefresh) {
        dispatch({
          type: LIST_BY_CLIENT_RESPONSE,
          list
        })
      } else {
        dispatch({
          type: LIST_BY_CLIENT_REQUEST,
          isLoading
        })
      }
    } catch(e) {
      dispatch({
        type: LIST_BY_CLIENT_REQUEST,
        isLoading
      })
    }

    try {
      const { data } = await axios.post(API_URL, queryBuilder({
        type: 'query',
        operation: 'jobsByClient',
        data: { clientId },
        fields: ['_id', 'clientId { _id, name }', 'role', 'description', 'createdAt']
      }))

      if(data.errors && data.errors.length > 0) {
        dispatch({
          type: MESSAGE_SHOW,
          message: data.errors[0].message
        })
      } else {
        const list = data.data.jobsByClient

        dispatch({
          type: LIST_BY_CLIENT_RESPONSE,
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
        type: LIST_BY_CLIENT_DONE,
        isLoading: false
      })
    }
  }
}
