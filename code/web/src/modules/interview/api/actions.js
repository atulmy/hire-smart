// Imports
import axios from 'axios'
import isEmpty from 'validator/lib/isEmpty'

// App Imports
import { API_URL } from '../../../setup/config/env'
import { queryBuilder } from '../../../setup/helpers'

// Actions Types
export const INTERVIEWS_GET_LIST_REQUEST = 'INTERVIEW/GET_LIST_REQUEST'
export const INTERVIEWS_GET_LIST_RESPONSE = 'INTERVIEW/GET_LIST_RESPONSE'
export const INTERVIEWS_GET_LIST_FAILURE = 'INTERVIEW/GET_LIST_FAILURE'
export const INTERVIEWS_GET_LIST_RESET = 'INTERVIEW/GET_LIST_RESET'
export const INTERVIEWS_GET_REQUEST = 'INTERVIEW/GET_REQUEST'
export const INTERVIEWS_GET_RESPONSE = 'INTERVIEW/GET_RESPONSE'
export const INTERVIEWS_GET_FAILURE = 'INTERVIEW/GET_FAILURE'
export const INTERVIEWS_EDIT_SET = 'INTERVIEW/EDIT_SET'
export const INTERVIEWS_EDIT_UNSET = 'INTERVIEW/EDIT_UNSET'

// Actions

// Get list
export function getList(isLoading = true) {
  return dispatch => {
    dispatch({
      type: INTERVIEWS_GET_LIST_REQUEST,
      error: null,
      isLoading
    })

    return axios.post(API_URL, queryBuilder({
      type: 'query',
      operation: 'interviewsByOrganization',
      fields: ['_id', 'name', 'description']
    }))
      .then(response => {
        if (response.status === 200) {
          dispatch({
            type: INTERVIEWS_GET_LIST_RESPONSE,
            error: null,
            isLoading: false,
            list: response.data.data.interviewsByOrganization
          })
        } else {
          dispatch({
            type: INTERVIEWS_GET_LIST_FAILURE,
            error: 'Some error occurred. Please try again.',
            isLoading: false
          })
        }
      })
      .catch(() => {
        dispatch({
          type: INTERVIEWS_GET_LIST_FAILURE,
          error: 'Some error occurred. Please try again.',
          isLoading: false
        })
      })
  }
}

// Get single
export function get(interviewId, isLoading = true) {
  return dispatch => {
    dispatch({
      type: INTERVIEWS_GET_REQUEST,
      isLoading
    })

    return axios.post(API_URL, queryBuilder({
      type: 'query',
      operation: 'interview',
      data: { id: interviewId },
      fields: ['_id', 'name', 'description', 'createdAt']
    }))
      .then(response => {
        if (response.status === 200) {
          if (response.data.errors && response.data.errors.length > 0) {
            dispatch({
              type: INTERVIEWS_GET_FAILURE,
              error: response.data.errors[0].message,
              isLoading: false
            })
          } else {
            dispatch({
              type: INTERVIEWS_GET_RESPONSE,
              error: null,
              isLoading: false,
              item: response.data.data.interview
            })
          }
        } else {
          dispatch({
            type: INTERVIEWS_GET_FAILURE,
            error: 'Some error occurred. Please try again.',
            isLoading: false
          })
        }
      })
      .catch(error => {
        dispatch({
          type: INTERVIEWS_GET_FAILURE,
          error: error,
          isLoading: false
        })
      })
  }
}

// Get by Client
export function getListByClient({ clientId }) {
  return dispatch => {
    return axios.post(API_URL, queryBuilder({
      type: 'query',
      operation: 'interviewsByClient',
      data: { clientId },
      fields: ['_id', 'organizationId', 'clientId', 'candidateId', 'panelId', 'userId', 'dateTime', 'mode', 'createdAt']
    }))
  }
}

// Create or update
export function createOrUpdate(interview) {
  if (!isEmpty(interview.id)) {
    return update(interview)
  } else {
    delete interview.id
    return create(interview)
  }
}

// Create
export function create(interview) {
  return dispatch => {
    return axios.post(API_URL, queryBuilder({
      type: 'mutation',
      operation: 'interviewCreate',
      data: interview,
      fields: ['_id']
    }))
  }
}

// Update
export function update(interview) {
  return dispatch => {
    return axios.post(API_URL, queryBuilder({
      type: 'mutation',
      operation: 'interviewUpdate',
      data: interview,
      fields: ['_id']
    }))
  }
}

// Remove
export function remove(data) {
  return dispatch => {
    return axios.post(API_URL, queryBuilder({
      type: 'mutation',
      operation: 'interviewRemove',
      data,
      fields: ['_id']
    }))
  }
}

// Edit
export function edit(interview) {
  return { type: INTERVIEWS_EDIT_SET, interview }
}
export function editClose() {
  return { type: INTERVIEWS_EDIT_UNSET }
}
