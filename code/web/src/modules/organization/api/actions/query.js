// Imports
import axios from 'axios'

// App Imports
import { API_URL } from '../../../../setup/config/env'
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
  return async dispatch => {
    dispatch({
      type: LIST_REQUEST,
      isLoading
    })

    try {
      const { data } = await axios.post(API_URL, {
        operation: 'organizationsByUser',
        fields: ['_id', 'name', 'description', 'domain', 'createdAt']
      })

      if(data.errors && data.errors.length > 0) {
        dispatch({
          type: MESSAGE_SHOW,
          message: data.errors[0].message
        })
      } else {
        dispatch({
          type: LIST_RESPONSE,
          list: data.data
        })
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
export function get(organizationId, isLoading = true) {
  return async dispatch => {
    dispatch({
      type: SINGLE_REQUEST,
      isLoading
    })

    try {
      const { data } = await axios.post(API_URL, {
        operation: 'organization',
        params: { id: organizationId },
        fields: ['_id', 'name', 'description', 'domain', 'createdAt']
      })

      if(data.errors && data.errors.length > 0) {
        dispatch({
          type: MESSAGE_SHOW,
          message: data.errors[0].message
        })
      } else {
        dispatch({
          type: SINGLE_RESPONSE,
          item: data.data
        })
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

// Get single by user
export function getByUser() {
  return dispatch => {
    return axios.post(API_URL, {
      operation: 'organizationByUser',
      fields: ['_id', 'name', 'description', 'domain', 'createdAt']
    })
  }
}
