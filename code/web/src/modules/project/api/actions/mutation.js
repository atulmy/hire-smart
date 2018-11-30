// Imports
import axios from 'axios'
import isEmpty from 'lodash/isEmpty'

// App Imports
import { API_URL } from '../../../../setup/config/env'
import { EDIT_SET, EDIT_UNSET } from './types'

// Create or update
export function createOrUpdate(project) {
  if (!isEmpty(project.id)) {
    return update(project)
  } else {
    delete project.id
    return create(project)
  }
}

// Create
export function create(project) {
  return dispatch => {
    return axios.post(API_URL, {
      operation: 'projectCreate',
      params: project
    })
  }
}

// Update
export function update(project) {
  return dispatch => {
    return axios.post(API_URL, {
      operation: 'projectUpdate',
      params: project,
    })
  }
}

// Remove
export function remove(data) {
  return dispatch => {
    return axios.post(API_URL, {
      operation: 'projectRemove',
      params: data,
    })
  }
}

// Edit
export function edit(project) {
  return { type: EDIT_SET, project }
}
export function editClose() {
  return { type: EDIT_UNSET }
}
