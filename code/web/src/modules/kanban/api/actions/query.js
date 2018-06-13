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
        operation: 'kanbansByOrganization',
        fields: ['_id', 'clientId { _id, name }', 'candidateId { _id, name }', 'interviewId { _id, dateTime }', 'status', 'highlight', 'createdAt']
      }))

      if(data.errors && data.errors.length > 0) {
        dispatch({
          type: MESSAGE_SHOW,
          message: data.errors[0].message
        })
      } else {
        dispatch({
          type: LIST_RESPONSE,
          list: data.data.kanbansByOrganization
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
export function get(kanbanId, isLoading = true) {
  return async dispatch => {
    dispatch({
      type: SINGLE_REQUEST,
      isLoading
    })

    try {
      const { data } = await axios.post(API_URL, queryBuilder({
        type: 'query',
        operation: 'kanban',
        data: { id: kanbanId },
        fields: ['_id', 'clientId { _id, name }', 'candidateId { _id, name }', 'interviewId { _id, dateTime }', 'status', 'highlight', 'createdAt']
      }))

      if(data.errors && data.errors.length > 0) {
        dispatch({
          type: MESSAGE_SHOW,
          message: data.errors[0].message
        })
      } else {
        dispatch({
          type: SINGLE_RESPONSE,
          item: data.data.kanban
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
        operation: 'kanbansByClient',
        data: { clientId },
        fields: ['_id', 'clientId { _id, name }', 'candidateId { _id, name }', 'interviewId { _id, dateTime }', 'status', 'highlight', 'createdAt']
      }))

      if(data.errors && data.errors.length > 0) {
        dispatch({
          type: MESSAGE_SHOW,
          message: data.errors[0].message
        })
      } else {
        dispatch({
          type: LIST_BY_CLIENT_RESPONSE,
          list: data.data.kanbansByClient
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
