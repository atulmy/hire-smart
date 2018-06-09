// Imports
import axios from 'axios'
import isEmpty from 'validator/lib/isEmpty'

// App Imports
import { API_URL } from '../../../../setup/config/env'
import { queryBuilder } from '../../../../setup/helpers'
import { EDIT_SET, EDIT_UNSET } from './types'

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
  return { type: EDIT_SET, panel }
}
export function editClose() {
  return { type: EDIT_UNSET }
}
