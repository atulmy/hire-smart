// Imports
import axios from 'axios'
import queryBuilder from 'gql-query-builder'
import isEmpty from 'lodash/isEmpty'

// App Imports
import { API_URL } from '../../../../setup/config/env'
import { EDIT_SET, EDIT_UNSET, VIEW_SET, VIEW_UNSET, VIEW_HIDE } from './types'

// Create or update
export function createOrUpdate(job) {
  if (!isEmpty(job.id)) {
    return update(job)
  } else {
    delete job.id
    return create(job)
  }
}

// Create
export function create(job) {
  return dispatch => {
    return axios.post(API_URL, queryBuilder({
      type: 'mutation',
      operation: 'jobCreate',
      data: job,
      fields: ['_id']
    }))
  }
}

// Update
export function update(job) {
  return dispatch => {
    return axios.post(API_URL, queryBuilder({
      type: 'mutation',
      operation: 'jobUpdate',
      data: job,
      fields: ['_id']
    }))
  }
}

// Remove
export function remove(data) {
  return dispatch => {
    return axios.post(API_URL, queryBuilder({
      type: 'mutation',
      operation: 'jobRemove',
      data,
      fields: ['_id']
    }))
  }
}

// Edit
export function edit(job) {
  return { type: EDIT_SET, job }
}
export function editClose() {
  return { type: EDIT_UNSET }
}

// View
export function view(job) {
  return { type: VIEW_SET, job }
}
export function viewClose() {
  return { type: VIEW_UNSET }
}
export function viewHide() {
  return { type: VIEW_HIDE }
}
