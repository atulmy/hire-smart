// Imports
import axios from 'axios'

// App Imports
import { API_URL } from '../../../../setup/config/env'
import { queryBuilder } from '../../../../setup/helpers'
import { MESSAGE_SHOW } from '../../../common/api/actions'
import {
  LIST_REQUEST,
  LIST_RESPONSE,
  LIST_DONE,
  SINGLE_REQUEST,
  SINGLE_RESPONSE,
  SINGLE_DONE
} from './types'

// Get list
export function getList(isLoading = true) {
  return dispatch => {
    dispatch({
      type: LIST_REQUEST,
      isLoading
    })

    return axios.post(API_URL, queryBuilder({
      type: 'query',
      operation: 'organizationsByUser',
      fields: ['_id', 'name', 'description', 'domain', 'createdAt']
    }))
      .then(response => {
        if (response.data.errors && response.data.errors.length > 0) {
          dispatch({
            type: MESSAGE_SHOW,
            message: response.data.errors[0].message
          })
        } else {
          dispatch({
            type: LIST_RESPONSE,
            list: response.data.data.organizationsByUser
          })
        }
      })
      .catch(() => {
        dispatch({
          type: MESSAGE_SHOW,
          message: 'Some error occurred. Please try again.'
        })
      })
      .finally(() => {
        dispatch({
          type: LIST_DONE,
          isLoading: false
        })
      })
  }
}

// Get single
export function get(organizationId, isLoading = true) {
  return dispatch => {
    dispatch({
      type: SINGLE_REQUEST,
      isLoading
    })

    return axios.post(API_URL, queryBuilder({
      type: 'query',
      operation: 'organization',
      data: { id: organizationId },
      fields: ['_id', 'name', 'description', 'domain', 'createdAt']
    }))
      .then(response => {
        if(response.data.errors && response.data.errors.length > 0) {
          dispatch({
            type: MESSAGE_SHOW,
            message: response.data.errors[0].message
          })
        } else {
          dispatch({
            type: SINGLE_RESPONSE,
            item: response.data.data.organization
          })
        }
      })
      .catch(error => {
        dispatch({
          type: MESSAGE_SHOW,
          message: 'Some error occurred. Please try again.'
        })
      })
      .finally(() => {
        dispatch({
          type: SINGLE_DONE,
          isLoading: false
        })
      })
  }
}

// Get single by user
export function getByUser() {
  return dispatch => {
    return axios.post(API_URL, queryBuilder({
      type: 'query',
      operation: 'organizationByUser',
      fields: ['_id', 'name', 'description', 'domain', 'createdAt']
    }))
  }
}
