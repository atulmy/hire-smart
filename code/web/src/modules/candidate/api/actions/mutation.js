// Imports
import axios from 'axios'
import isEmpty from 'lodash/isEmpty'

// App Imports
import { API_URL } from '../../../../setup/config/env'
import { EDIT_SET, EDIT_UNSET, VIEW_SET, VIEW_UNSET, VIEW_HIDE } from './types'

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
    return axios.post(API_URL, {
      operation: 'candidateCreate',
      params: candidate,
    })
  }
}

// Update
export function update(candidate) {
  return dispatch => {
    return axios.post(API_URL, {
      operation: 'candidateUpdate',
      params: candidate
    })
  }
}

// Remove
export function remove(data) {
  return dispatch => {
    return axios.post(API_URL, {
      operation: 'candidateRemove',
      params: data,
    })
  }
}

// Edit
export function edit(candidate) {
  return { type: EDIT_SET, candidate }
}
export function editClose() {
  return { type: EDIT_UNSET }
}

// View
export function view(candidate) {
  return { type: VIEW_SET, candidate }
}
export function viewClose() {
  return { type: VIEW_UNSET }
}
export function viewHide() {
  return { type: VIEW_HIDE }
}
