// Imports
import axios from 'axios'
import isEmpty from 'validator/lib/isEmpty'

// App Imports
import { API_URL } from '../../../setup/config/env'
import { queryBuilder } from '../../../setup/helpers'

// Actions Types
export const CANDIDATES_GET_LIST_REQUEST = 'CANDIDATE/GET_LIST_REQUEST'
export const CANDIDATES_GET_LIST_RESPONSE = 'CANDIDATE/GET_LIST_RESPONSE'
export const CANDIDATES_GET_LIST_FAILURE = 'CANDIDATE/GET_LIST_FAILURE'
export const CANDIDATES_GET_LIST_RESET = 'CANDIDATE/GET_LIST_RESET'
export const CANDIDATES_GET_REQUEST = 'CANDIDATE/GET_REQUEST'
export const CANDIDATES_GET_RESPONSE = 'CANDIDATE/GET_RESPONSE'
export const CANDIDATES_GET_FAILURE = 'CANDIDATE/GET_FAILURE'
export const CANDIDATES_EDIT_SET = 'CANDIDATE/EDIT_SET'
export const CANDIDATES_EDIT_UNSET = 'CANDIDATE/EDIT_UNSET'

// Actions

// Get list
export function getList(isLoading = true) {
  return dispatch => {
    dispatch({
      type: CANDIDATES_GET_LIST_REQUEST,
      error: null,
      isLoading
    })

    return axios.post(API_URL, queryBuilder({
      type: 'query',
      operation: 'candidatesByUser',
      fields: ['_id', 'name', 'email', 'mobile', 'experience', 'resume', 'salaryCurrent', 'salaryExpected', 'createdAt']
    }))
      .then(response => {
        if (response.status === 200) {
          dispatch({
            type: CANDIDATES_GET_LIST_RESPONSE,
            error: null,
            isLoading: false,
            list: response.data.data.candidatesByUser
          })
        } else {
          dispatch({
            type: CANDIDATES_GET_LIST_FAILURE,
            error: 'Some error occurred. Please try again.',
            isLoading: false
          })
        }
      })
      .catch(() => {
        dispatch({
          type: CANDIDATES_GET_LIST_FAILURE,
          error: 'Some error occurred. Please try again.',
          isLoading: false
        })
      })
  }
}

// Get single
export function get(candidateId, isLoading = true) {
  return dispatch => {
    dispatch({
      type: CANDIDATES_GET_REQUEST,
      isLoading
    })

    return axios.post(API_URL, queryBuilder({
      type: 'query',
      operation: 'candidate',
      data: { id: candidateId },
      fields: ['_id', 'name', 'email', 'mobile', 'experience', 'resume', 'salaryCurrent', 'salaryExpected', 'createdAt']
    }))
      .then(response => {
        if (response.status === 200) {
          if (response.data.errors && response.data.errors.length > 0) {
            dispatch({
              type: CANDIDATES_GET_FAILURE,
              error: response.data.errors[0].message,
              isLoading: false
            })
          } else {
            dispatch({
              type: CANDIDATES_GET_RESPONSE,
              error: null,
              isLoading: false,
              item: response.data.data.candidate
            })
          }
        } else {
          dispatch({
            type: CANDIDATES_GET_FAILURE,
            error: 'Some error occurred. Please try again.',
            isLoading: false
          })
        }
      })
      .catch(error => {
        dispatch({
          type: CANDIDATES_GET_FAILURE,
          error: error,
          isLoading: false
        })
      })
  }
}

// Create or update
export function createOrUpdate(candidate) {
  if (!isEmpty(candidate.id)) {
    return update(candidate)
  } else {
    delete candidate.id
    return create(candidate)
  }
}

// Create
export function create(candidate) {
  return dispatch => {
    return axios.post(API_URL, queryBuilder({
      type: 'mutation',
      operation: 'candidateCreate',
      data: candidate,
      fields: ['_id']
    }))
  }
}

// Update
export function update(candidate) {
  return dispatch => {
    return axios.post(API_URL, queryBuilder({
      type: 'mutation',
      operation: 'candidateUpdate',
      data: candidate,
      fields: ['_id']
    }))
  }
}

// Remove
export function remove(data) {
  return dispatch => {
    return axios.post(API_URL, queryBuilder({
      type: 'mutation',
      operation: 'candidateRemove',
      data,
      fields: ['_id']
    }))
  }
}

// Edit
export function edit(candidate) {
  return { type: CANDIDATES_EDIT_SET, candidate }
}
export function editClose() {
  return { type: CANDIDATES_EDIT_UNSET }
}
