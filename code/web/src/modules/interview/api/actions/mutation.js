// Imports
import axios from 'axios'
import isEmpty from 'validator/lib/isEmpty'

// App Imports
import { API_URL } from '../../../../setup/config/env'
import { queryBuilder } from '../../../../setup/helpers'
import { EDIT_SET, EDIT_UNSET, VIEW_HIDE, VIEW_SET, VIEW_UNSET } from './types'

// Create or update
export function createOrUpdate(interview) {
  if (!isEmpty(interview.id)) {
    return update(interview)
  } else {
    delete interview.id
    return create(interview)
  }
}

// Create
export function create(interview) {
  return dispatch => {
    return axios.post(API_URL, queryBuilder({
      type: 'mutation',
      operation: 'interviewCreate',
      data: interview,
      fields: ['_id']
    }))
  }
}

// Update
export function update(interview) {
  return dispatch => {
    return axios.post(API_URL, queryBuilder({
      type: 'mutation',
      operation: 'interviewUpdate',
      data: interview,
      fields: ['_id']
    }))
  }
}

// Remove
export function remove(data) {
  return dispatch => {
    return axios.post(API_URL, queryBuilder({
      type: 'mutation',
      operation: 'interviewRemove',
      data,
      fields: ['_id']
    }))
  }
}

// Remind
export function remind(data) {
  return dispatch => {
    return axios.post(API_URL, queryBuilder({
      type: 'mutation',
      operation: 'interviewRemind',
      data,
      fields: ['_id']
    }))
  }
}

// Edit
export function edit(interview) {
  return { type: EDIT_SET, interview }
}
export function editClose() {
  return { type: EDIT_UNSET }
}

// View
export function view(interview) {
  return { type: VIEW_SET, interview }
}
export function viewClose() {
  return { type: VIEW_UNSET }
}
export function viewHide() {
  return { type: VIEW_HIDE }
}
