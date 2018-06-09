// Imports
import axios from 'axios'

// App Imports
import { API_URL } from '../../../../setup/config/env'
import { queryBuilder } from '../../../../setup/helpers'
import { MESSAGE_SHOW } from '../../../common/api/actions'
import {
  CANDIDATES_GET_LIST_REQUEST,
  CANDIDATES_GET_LIST_RESPONSE,
  CANDIDATES_GET_LIST_DONE,
  CANDIDATE_GET_REQUEST,
  CANDIDATE_GET_RESPONSE,
  CANDIDATE_GET_DONE,
  CANDIDATES_GET_LIST_BY_CLIENT_REQUEST,
  CANDIDATES_GET_LIST_BY_CLIENT_RESPONSE,
  CANDIDATES_GET_LIST_BY_CLIENT_DONE
} from './types'

// Get list
export function getList(isLoading = true) {
  return dispatch => {
    dispatch({
      type: CANDIDATES_GET_LIST_REQUEST,
      isLoading
    })

    return axios.post(API_URL, queryBuilder({
      type: 'query',
      operation: 'candidatesByOrganization',
      fields: ['_id', 'clientId', 'name', 'email', 'mobile', 'experience', 'resume', 'salaryCurrent', 'salaryExpected', 'createdAt']
    }))
      .then(response => {
        if (response.data.errors && response.data.errors.length > 0) {
          dispatch({
            type: MESSAGE_SHOW,
            message: response.data.errors[0].message
          })
        } else {
          dispatch({
            type: CANDIDATES_GET_LIST_RESPONSE,
            list: response.data.data.candidatesByOrganization
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
          type: CANDIDATES_GET_LIST_DONE,
          isLoading: false
        })
      })
  }
}

// Get single
export function get(candidateId, isLoading = true) {
  return dispatch => {
    dispatch({
      type: CANDIDATE_GET_REQUEST,
      isLoading
    })

    return axios.post(API_URL, queryBuilder({
      type: 'query',
      operation: 'candidate',
      data: { id: candidateId },
      fields: ['_id', 'clientId', 'name', 'email', 'mobile', 'experience', 'resume', 'salaryCurrent', 'salaryExpected', 'createdAt']
    }))
      .then(response => {
        if(response.data.errors && response.data.errors.length > 0) {
          dispatch({
            type: MESSAGE_SHOW,
            message: response.data.errors[0].message
          })
        } else {
          dispatch({
            type: CANDIDATE_GET_RESPONSE,
            item: response.data.data.candidate
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
          type: CANDIDATE_GET_DONE,
          isLoading: false
        })
      })
  }
}

// Get by Client
export function getListByClient({ clientId }, isLoading = true) {
  return async dispatch => {
    dispatch({
      type: CANDIDATES_GET_LIST_BY_CLIENT_REQUEST,
      isLoading
    })

    try {
      const { data } = await axios.post(API_URL, queryBuilder({
        type: 'query',
        operation: 'candidatesByClient',
        data: { clientId },
        fields: ['_id', 'clientId', 'name', 'email', 'mobile', 'experience', 'resume', 'salaryCurrent', 'salaryExpected', 'createdAt']
      }))

      if(data.errors && data.errors.length > 0) {
        dispatch({
          type: MESSAGE_SHOW,
          message: data.errors[0].message
        })
      } else {
        dispatch({
          type: CANDIDATES_GET_LIST_BY_CLIENT_RESPONSE,
          list: data.data.candidatesByClient
        })
      }
    } catch (e) {
      dispatch({
        type: MESSAGE_SHOW,
        message: 'Some error occurred. Please try again.'
      })
    } finally {
      dispatch({
        type: CANDIDATES_GET_LIST_BY_CLIENT_DONE,
        isLoading: false
      })
    }
  }
}
