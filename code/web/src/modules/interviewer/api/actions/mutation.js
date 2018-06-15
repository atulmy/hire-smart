// Imports
import axios from 'axios'
import isEmpty from 'validator/lib/isEmpty'

// App Imports
import { API_URL } from '../../../../setup/config/env'
import { queryBuilder } from '../../../../setup/helpers'
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
    return axios.post(API_URL, queryBuilder({
      type: 'mutation',
      operation: 'interviewerCreate',
      data: interviewer,
      fields: ['_id']
    }))
  }
}

// Update
export function update(interviewer) {
  return dispatch => {
    return axios.post(API_URL, queryBuilder({
      type: 'mutation',
      operation: 'interviewerUpdate',
      data: interviewer,
      fields: ['_id']
    }))
  }
}

// Remove
export function remove(data) {
  return dispatch => {
    return axios.post(API_URL, queryBuilder({
      type: 'mutation',
      operation: 'interviewerRemove',
      data,
      fields: ['_id']
    }))
  }
}

// Edit
export function edit(interviewer) {
  return { type: EDIT_SET, interviewer }
}
export function editClose() {
  return { type: EDIT_UNSET }
}
