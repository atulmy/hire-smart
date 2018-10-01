// Imports
import axios from 'axios'
import queryBuilder from 'gql-query-builder'
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
    return axios.post(API_URL, queryBuilder({
      type: 'mutation',
      operation: 'organizationCreate',
      data: organization,
      fields: ['_id']
    }))
  }
}

// Update
export function update(organization) {
  return dispatch => {
    return axios.post(API_URL, queryBuilder({
      type: 'mutation',
      operation: 'organizationUpdate',
      data: organization,
      fields: ['_id']
    }))
  }
}

// Remove
export function remove(data) {
  return dispatch => {
    return axios.post(API_URL, queryBuilder({
      type: 'mutation',
      operation: 'organizationRemove',
      data,
      fields: ['_id']
    }))
  }
}
