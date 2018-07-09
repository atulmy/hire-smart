// Imports
import axios from 'axios'

// App Imports
import { API_URL } from '../../../../setup/config/env'
import { queryBuilder } from '../../../../setup/helpers'
import { MESSAGE_SHOW } from '../../../common/api/actions'
import { ACTIVITY_LIST_BY_ORGANIZATION_CACHE, ACTIVITY_LIST_BY_CLIENT_CACHE } from './cache-keys'
import {
  LIST_BY_ORGANIZATION_REQUEST,
  LIST_BY_ORGANIZATION_RESPONSE,
  LIST_BY_ORGANIZATION_DONE,
  LIST_BY_CLIENT_REQUEST,
  LIST_BY_CLIENT_RESPONSE,
  LIST_BY_CLIENT_DONE
} from './types'

// Get by Organization
export function getListByOrganization({ clientId }, isLoading = true, forceRefresh = false) {
  return async dispatch => {
    // Caching
    const CACHE_KEY = `${ ACTIVITY_LIST_BY_ORGANIZATION_CACHE }.${ clientId }`

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
      const { data } = await axios.post(API_URL, queryBuilder({
        type: 'query',
        operation: 'activitiesByOrganization',
        fields: [
          '_id',
          'action',
          'message',
          'createdAt'
        ]
      }))

      if(data.errors && data.errors.length > 0) {
        dispatch({
          type: MESSAGE_SHOW,
          message: data.errors[0].message
        })
      } else {
        const list = data.data.activitiesByOrganization

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

// Get by Client
export function getListByClient({ clientId }, isLoading = true, forceRefresh = false) {
  return async dispatch => {
    // Caching
    const CACHE_KEY = `${ ACTIVITY_LIST_BY_CLIENT_CACHE }.${ clientId }`

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
        operation: 'activitiesByClient',
        data: { clientId },
        fields: [
          '_id',
          'action',
          'message',
          'createdAt'
        ]
      }))

      if(data.errors && data.errors.length > 0) {
        dispatch({
          type: MESSAGE_SHOW,
          message: data.errors[0].message
        })
      } else {
        const list = data.data.activitiesByClient

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
