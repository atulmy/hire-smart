// Imports
import axios from 'axios'
import isEmpty from 'lodash/isEmpty'

// App Imports
import { API_URL } from '../../../../setup/config/env'
import { EDIT_SET, EDIT_UNSET } from './types'

// Create or update
export function createOrUpdate(interviewer) {
  if (!isEmpty(interviewer.id)) {
    return update(interviewer)
  } else {
    delete interviewer.id
    return create(interviewer)
  }
}

// Create
export function create(interviewer) {
  return dispatch => {
    return axios.post(API_URL, {
      operation: 'interviewerCreate',
      params: interviewer,
    })
  }
}

// Update
export function update(interviewer) {
  return dispatch => {
    return axios.post(API_URL, {
      operation: 'interviewerUpdate',
      params: interviewer,
    })
  }
}

// Remove
export function remove(data) {
  return dispatch => {
    return axios.post(API_URL, {
      operation: 'interviewerRemove',
      params: data,
    })
  }
}

// Edit
export function edit(interviewer) {
  return { type: EDIT_SET, interviewer }
}
export function editClose() {
  return { type: EDIT_UNSET }
}
