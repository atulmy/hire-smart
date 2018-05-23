// Imports
import axios from 'axios'

// App Imports
import { API_URL } from '../../../setup/config/env'
import { queryBuilder } from '../../../setup/helpers'

// Actions Types
export const CLIENTS_GET_LIST_REQUEST = 'CLIENT/GET_LIST_REQUEST'
export const CLIENTS_GET_LIST_RESPONSE = 'CLIENT/GET_LIST_RESPONSE'
export const CLIENTS_GET_LIST_FAILURE = 'CLIENT/GET_LIST_FAILURE'
export const CLIENTS_GET_LIST_RESET = 'CLIENT/GET_LIST_RESET'
export const CLIENTS_GET_REQUEST = 'CLIENT/GET_REQUEST'
export const CLIENTS_GET_RESPONSE = 'CLIENT/GET_RESPONSE'
export const CLIENTS_GET_FAILURE = 'CLIENT/GET_FAILURE'

// Actions

// Get list
export function getList(isLoading = true) {
  return dispatch => {
    dispatch({
      type: CLIENTS_GET_LIST_REQUEST,
      error: null,
      isLoading
    })

    return axios.post(API_URL, queryBuilder({
      type: 'query',
      operation: 'clientsByUser',
      fields: ['_id', 'name']
    }))
      .then(response => {
        if (response.status === 200) {
          dispatch({
            type: CLIENTS_GET_LIST_RESPONSE,
            error: null,
            isLoading: false,
            list: response.data.data.clientsByUser
          })
        } else {
          dispatch({
            type: CLIENTS_GET_LIST_FAILURE,
            error: 'Some error occurred. Please try again.',
            isLoading: false
          })
        }
      })
      .catch(() => {
        dispatch({
          type: CLIENTS_GET_LIST_FAILURE,
          error: 'Some error occurred. Please try again.',
          isLoading: false
        })
      })
  }
}

// Get single
export function get(slug, isLoading = true) {
  return dispatch => {
    dispatch({
      type: CLIENTS_GET_REQUEST,
      isLoading
    })

    return axios.post(API_URL, queryBuilder({
      type: 'query',
      operation: 'client',
      data: { slug },
      fields: ['id', 'name', 'slug', 'description', 'image', 'createdAt']
    }))
      .then(response => {
        if (response.status === 200) {
          if (response.data.errors && response.data.errors.length > 0) {
            dispatch({
              type: CLIENTS_GET_FAILURE,
              error: response.data.errors[0].message,
              isLoading: false
            })
          } else {
            dispatch({
              type: CLIENTS_GET_RESPONSE,
              error: null,
              isLoading: false,
              item: response.data.data.client
            })
          }
        } else {
          dispatch({
            type: CLIENTS_GET_FAILURE,
            error: 'Some error occurred. Please try again.',
            isLoading: false
          })
        }
      })
      .catch(error => {
        dispatch({
          type: CLIENTS_GET_FAILURE,
          error: error,
          isLoading: false
        })
      })
  }
}

// Get single by Id
export function getById(clientId) {
  return dispatch => {
    return axios.post(API_URL, queryBuilder({
      type: 'query',
      operation: 'clientById',
      data: { clientId },
      fields: ['id', 'name', 'slug', 'description', 'image', 'type', 'gender']
    }))
  }
}

// Create or update
export function createOrUpdate(client) {
  if (client.id > 0) {
    return update(client)
  } else {
    delete client.id
    return create(client)
  }
}

// Create
export function create(client) {
  return dispatch => {
    return axios.post(API_URL, queryBuilder({
      type: 'mutation',
      operation: 'clientCreate',
      data: client,
      fields: ['id']
    }))
  }
}

// Update
export function update(client) {
  return dispatch => {
    return axios.post(API_URL, queryBuilder({
      type: 'mutation',
      operation: 'clientUpdate',
      data: client,
      fields: ['id']
    }))
  }
}

// Remove
export function remove(data) {
  return dispatch => {
    return axios.post(API_URL, queryBuilder({
      type: 'mutation',
      operation: 'clientRemove',
      data,
      fields: ['id']
    }))
  }
}
