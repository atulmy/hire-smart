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
  SINGLE_DONE,
  LIST_BY_CLIENT_REQUEST,
  LIST_BY_CLIENT_RESPONSE,
  LIST_BY_CLIENT_DONE
} from './types'

// Get list
export function getList(isLoading = true) {
  return async dispatch => {
    dispatch({
      type: LIST_REQUEST,
      isLoading
    })

    try {
      const { data } = await axios.post(API_URL, queryBuilder({
        type: 'query',
        operation: 'candidatesByOrganization',
        fields: ['_id', 'clientId { _id, name }', 'name', 'email', 'mobile', 'experience', 'resume', 'salaryCurrent', 'salaryExpected', 'createdAt']
      }))

      if(data.errors && data.errors.length > 0) {
        dispatch({
          type: MESSAGE_SHOW,
          message: data.errors[0].message
        })
      } else {
        dispatch({
          type: LIST_RESPONSE,
          list: data.data.candidatesByOrganization
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
export function get(candidateId, isLoading = true) {
  return async dispatch => {
    dispatch({
      type: SINGLE_REQUEST,
      isLoading
    })

    try {
      const { data } = await axios.post(API_URL, queryBuilder({
        type: 'query',
        operation: 'candidate',
        data: { id: candidateId },
        fields: ['_id', 'name', 'email', 'mobile', 'experience', 'resume', 'salaryCurrent', 'salaryExpected', 'createdAt']
      }))

      if(data.errors && data.errors.length > 0) {
        dispatch({
          type: MESSAGE_SHOW,
          message: data.errors[0].message
        })
      } else {
        dispatch({
          type: SINGLE_RESPONSE,
          item: data.data.candidate
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

// Get by Client
export function getListByClient({ clientId }, isLoading = true) {
  return async dispatch => {
    dispatch({
      type: LIST_BY_CLIENT_REQUEST,
      isLoading
    })

    try {
      const { data } = await axios.post(API_URL, queryBuilder({
        type: 'query',
        operation: 'candidatesByClient',
        data: { clientId },
        fields: ['_id', 'name', 'email', 'mobile', 'experience', 'resume', 'salaryCurrent', 'salaryExpected', 'createdAt']
      }))

      if(data.errors && data.errors.length > 0) {
        dispatch({
          type: MESSAGE_SHOW,
          message: data.errors[0].message
        })
      } else {
        dispatch({
          type: LIST_BY_CLIENT_RESPONSE,
          list: data.data.candidatesByClient
        })
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
