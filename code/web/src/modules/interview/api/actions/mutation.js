// Imports
import axios from 'axios'
import isEmpty from 'lodash/isEmpty'

// App Imports
import { API_URL } from '../../../../setup/config/env'
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
    return axios.post(API_URL, {
      operation: 'interviewCreate',
      params: interview,
    })
  }
}

// Update
export function update(interview) {
  return dispatch => {
    return axios.post(API_URL, {
      operation: 'interviewUpdate',
      params: interview,
    })
  }
}

// Remove
export function remove(data) {
  return dispatch => {
    return axios.post(API_URL, {
      operation: 'interviewRemove',
      params: data,
    })
  }
}

// Remind
export function remind(data) {
  return dispatch => {
    return axios.post(API_URL, {
      operation: 'interviewRemind',
      params: data,
    })
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
