// Imports
import axios from 'axios'
import isEmpty from 'lodash/isEmpty'

// App Imports
import { API_URL } from '../../../../setup/config/env'

// Create or update
export function createOrUpdate(organization) {
  if (!isEmpty(organization.id)) {
    return update(organization)
  } else {
    delete organization.id
    return create(organization)
  }
}

// Create
export function create(organization) {
  return dispatch => {
    return axios.post(API_URL, {
      operation: 'organizationCreate',
      params: organization
    })
  }
}

// Update
export function update(organization) {
  return dispatch => {
    return axios.post(API_URL, {
      operation: 'organizationUpdate',
      params: organization
    })
  }
}

// Remove
export function remove(data) {
  return dispatch => {
    return axios.post(API_URL, {
      operation: 'organizationRemove',
      params: data
    })
  }
}
