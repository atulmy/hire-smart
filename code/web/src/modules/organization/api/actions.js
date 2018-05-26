// Imports
import axios from 'axios'

// App Imports
import { API_URL } from '../../../setup/config/env'
import { queryBuilder } from '../../../setup/helpers'

// Actions Types
export const ORGANIZATIONS_GET_LIST_REQUEST = 'ORGANIZATION/GET_LIST_REQUEST'
export const ORGANIZATIONS_GET_LIST_RESPONSE = 'ORGANIZATION/GET_LIST_RESPONSE'
export const ORGANIZATIONS_GET_LIST_FAILURE = 'ORGANIZATION/GET_LIST_FAILURE'
export const ORGANIZATIONS_GET_REQUEST = 'ORGANIZATION/GET_REQUEST'
export const ORGANIZATIONS_GET_RESPONSE = 'ORGANIZATION/GET_RESPONSE'
export const ORGANIZATIONS_GET_FAILURE = 'ORGANIZATION/GET_FAILURE'

// Actions

// Get list
export function getList(isLoading = true) {
  return dispatch => {
    dispatch({
      type: ORGANIZATIONS_GET_LIST_REQUEST,
      error: null,
      isLoading
    })

    return axios.post(API_URL, queryBuilder({
      type: 'query',
      operation: 'organizationsByUser',
      fields: ['_id', 'name']
    }))
      .then(response => {
        if (response.status === 200) {
          dispatch({
            type: ORGANIZATIONS_GET_LIST_RESPONSE,
            error: null,
            isLoading: false,
            list: response.data.data.organizationsByUser
          })
        } else {
          dispatch({
            type: ORGANIZATIONS_GET_LIST_FAILURE,
            error: 'Some error occurred. Please try again.',
            isLoading: false
          })
        }
      })
      .catch(() => {
        dispatch({
          type: ORGANIZATIONS_GET_LIST_FAILURE,
          error: 'Some error occurred. Please try again.',
          isLoading: false
        })
      })
  }
}

// Get single
export function get(isLoading = true) {
  return dispatch => {
    dispatch({
      type: ORGANIZATIONS_GET_REQUEST,
      isLoading
    })

    return axios.post(API_URL, queryBuilder({
      type: 'query',
      operation: 'organizationsByUser',
      fields: ['_id', 'name', 'description', 'domain', 'createdAt']
    }))
      .then(response => {
        if (response.status === 200) {
          if (response.data.errors && response.data.errors.length > 0) {
            dispatch({
              type: ORGANIZATIONS_GET_FAILURE,
              error: response.data.errors[0].message,
              isLoading: false
            })
          } else {
            dispatch({
              type: ORGANIZATIONS_GET_RESPONSE,
              error: null,
              isLoading: false,
              item: response.data.data.organizationsByUser
            })
          }
        } else {
          dispatch({
            type: ORGANIZATIONS_GET_FAILURE,
            error: 'Some error occurred. Please try again.',
            isLoading: false
          })
        }
      })
      .catch(error => {
        dispatch({
          type: ORGANIZATIONS_GET_FAILURE,
          error: error,
          isLoading: false
        })
      })
  }
}

// Create or update
export function createOrUpdate(organization) {
  if (organization.id > 0) {
    return update(organization)
  } else {
    delete organization.id
    return create(organization)
  }
}

// Create
export function create(organization) {
  return dispatch => {
    return axios.post(API_URL, queryBuilder({
      type: 'mutation',
      operation: 'organizationCreate',
      data: organization,
      fields: ['_id']
    }))
  }
}

// Update
export function update(organization) {
  return dispatch => {
    return axios.post(API_URL, queryBuilder({
      type: 'mutation',
      operation: 'organizationUpdate',
      data: organization,
      fields: ['_id']
    }))
  }
}

// Remove
export function remove(data) {
  return dispatch => {
    return axios.post(API_URL, queryBuilder({
      type: 'mutation',
      operation: 'organizationRemove',
      data,
      fields: ['_id']
    }))
  }
}
