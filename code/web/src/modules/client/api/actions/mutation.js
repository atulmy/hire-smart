// Imports
import axios from 'axios'
import isEmpty from 'validator/lib/isEmpty'

// App Imports
import { API_URL } from '../../../../setup/config/env'
import { queryBuilder } from '../../../../setup/helpers'
import { EDIT_SET, EDIT_UNSET } from './types'

// Create or update
export function createOrUpdate(client) {
  if (!isEmpty(client.id)) {
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
      fields: ['_id']
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
      fields: ['_id']
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
      fields: ['_id']
    }))
  }
}

// Edit
export function edit(client) {
  return { type: EDIT_SET, client }
}
export function editClose() {
  return { type: EDIT_UNSET }
}
