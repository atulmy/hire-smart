// Imports
import axios from 'axios'
import isEmpty from 'lodash/isEmpty'

// App Imports
import { API_URL } from '../../../../setup/config/env'

// Create or update
export function createOrUpdate(kanban) {
  if (!isEmpty(kanban.id)) {
    return update(kanban)
  } else {
    delete kanban.id
    return create(kanban)
  }
}

// Create
export function create(kanban) {
  return dispatch => {
    return axios.post(API_URL, {
      operation: 'kanbanCreate',
      params: kanban
    })
  }
}

// Update
export function update(kanban) {
  return dispatch => {
    return axios.post(API_URL, {
      operation: 'kanbanUpdate',
      params: kanban
    })
  }
}

// Update status
export function updateStatus(kanban) {
  return dispatch => {
    return axios.post(API_URL, {
      operation: 'kanbanUpdateStatus',
      params: kanban
    })
  }
}

// Remove
export function remove(data) {
  return dispatch => {
    return axios.post(API_URL, {
      operation: 'kanbanRemove',
      params: data
    })
  }
}
