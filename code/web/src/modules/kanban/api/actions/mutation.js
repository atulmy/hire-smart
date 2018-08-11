// Imports
import axios from 'axios'
import isEmpty from 'lodash/isEmpty'

// App Imports
import { API_URL } from '../../../../setup/config/env'
import { queryBuilder } from '../../../../setup/helpers'

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
    return axios.post(API_URL, queryBuilder({
      type: 'mutation',
      operation: 'kanbanCreate',
      data: kanban,
      fields: ['_id']
    }))
  }
}

// Update
export function update(kanban) {
  return dispatch => {
    return axios.post(API_URL, queryBuilder({
      type: 'mutation',
      operation: 'kanbanUpdate',
      data: kanban,
      fields: ['_id']
    }))
  }
}

// Update status
export function updateStatus(kanban) {
  return dispatch => {
    return axios.post(API_URL, queryBuilder({
      type: 'mutation',
      operation: 'kanbanUpdateStatus',
      data: kanban,
      fields: ['_id']
    }))
  }
}

// Remove
export function remove(data) {
  return dispatch => {
    return axios.post(API_URL, queryBuilder({
      type: 'mutation',
      operation: 'kanbanRemove',
      data,
      fields: ['_id']
    }))
  }
}
