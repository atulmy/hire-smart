// Imports
import axios from 'axios'
import isEmpty from 'validator/lib/isEmpty'

// App Imports
import { API_URL } from '../../../setup/config/env'
import { queryBuilder } from '../../../setup/helpers'

// Actions Types
export const PANELS_GET_LIST_REQUEST = 'PANEL/GET_LIST_REQUEST'
export const PANELS_GET_LIST_RESPONSE = 'PANEL/GET_LIST_RESPONSE'
export const PANELS_GET_LIST_FAILURE = 'PANEL/GET_LIST_FAILURE'
export const PANELS_GET_LIST_RESET = 'PANEL/GET_LIST_RESET'
export const PANELS_GET_REQUEST = 'PANEL/GET_REQUEST'
export const PANELS_GET_RESPONSE = 'PANEL/GET_RESPONSE'
export const PANELS_GET_FAILURE = 'PANEL/GET_FAILURE'
export const PANELS_EDIT_SET = 'PANEL/EDIT_SET'
export const PANELS_EDIT_UNSET = 'PANEL/EDIT_UNSET'

// Actions

// Get list
export function getList(isLoading = true) {
  return dispatch => {
    dispatch({
      type: PANELS_GET_LIST_REQUEST,
      error: null,
      isLoading
    })

    return axios.post(API_URL, queryBuilder({
      type: 'query',
      operation: 'panelsByOrganization',
      fields: ['_id', 'name', 'email', 'mobile', 'createdAt']
    }))
      .then(response => {
        if (response.status === 200) {
          dispatch({
            type: PANELS_GET_LIST_RESPONSE,
            error: null,
            isLoading: false,
            list: response.data.data.panelsByOrganization
          })
        } else {
          dispatch({
            type: PANELS_GET_LIST_FAILURE,
            error: 'Some error occurred. Please try again.',
            isLoading: false
          })
        }
      })
      .catch(() => {
        dispatch({
          type: PANELS_GET_LIST_FAILURE,
          error: 'Some error occurred. Please try again.',
          isLoading: false
        })
      })
  }
}

// Get single
export function get(panelId, isLoading = true) {
  return dispatch => {
    dispatch({
      type: PANELS_GET_REQUEST,
      isLoading
    })

    return axios.post(API_URL, queryBuilder({
      type: 'query',
      operation: 'panel',
      data: { id: panelId },
      fields: ['_id', 'name', 'email', 'mobile', 'createdAt']
    }))
      .then(response => {
        if (response.status === 200) {
          if (response.data.errors && response.data.errors.length > 0) {
            dispatch({
              type: PANELS_GET_FAILURE,
              error: response.data.errors[0].message,
              isLoading: false
            })
          } else {
            dispatch({
              type: PANELS_GET_RESPONSE,
              error: null,
              isLoading: false,
              item: response.data.data.panel
            })
          }
        } else {
          dispatch({
            type: PANELS_GET_FAILURE,
            error: 'Some error occurred. Please try again.',
            isLoading: false
          })
        }
      })
      .catch(error => {
        dispatch({
          type: PANELS_GET_FAILURE,
          error: error,
          isLoading: false
        })
      })
  }
}

// Create or update
export function createOrUpdate(panel) {
  if (!isEmpty(panel.id)) {
    return update(panel)
  } else {
    delete panel.id
    return create(panel)
  }
}

// Create
export function create(panel) {
  return dispatch => {
    return axios.post(API_URL, queryBuilder({
      type: 'mutation',
      operation: 'panelCreate',
      data: panel,
      fields: ['_id']
    }))
  }
}

// Update
export function update(panel) {
  return dispatch => {
    return axios.post(API_URL, queryBuilder({
      type: 'mutation',
      operation: 'panelUpdate',
      data: panel,
      fields: ['_id']
    }))
  }
}

// Remove
export function remove(data) {
  return dispatch => {
    return axios.post(API_URL, queryBuilder({
      type: 'mutation',
      operation: 'panelRemove',
      data,
      fields: ['_id']
    }))
  }
}

// Edit
export function edit(panel) {
  return { type: PANELS_EDIT_SET, panel }
}
export function editClose() {
  return { type: PANELS_EDIT_UNSET }
}

// Get by Client
export function getListByClient({ clientId }) {
  return dispatch => {
    return axios.post(API_URL, queryBuilder({
      type: 'query',
      operation: 'panelsByClient',
      data: { clientId },
      fields: ['_id', 'name', 'email', 'mobile', 'createdAt']
    }))
  }
}
