// Imports
import axios from 'axios'

// App Imports
import { API_URL } from '../../../../setup/config/env'
import { queryBuilder } from '../../../../setup/helpers'

// Actions

// Get by id
export function get(id) {
  return dispatch => {
    return axios.post(API_URL, queryBuilder({
      type: 'query',
      operation: 'invite',
      data: { id },
      fields: ['_id', 'organizationId { _id, name }', 'email', 'name', 'createdAt']
    }))
  }
}
