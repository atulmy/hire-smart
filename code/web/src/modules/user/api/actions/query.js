// Imports
import axios from 'axios'

// App Imports
import { API_URL } from '../../../../setup/config/env'
import { queryBuilder } from '../../../../setup/helpers'

// Actions

// Get list by organization
export function getListByOrganization() {
  return dispatch => {
    return axios.post(API_URL, queryBuilder({
      type: 'query',
      operation: 'usersByOrganization',
      fields: ['_id', 'name', 'email', 'createdAt']
    }))
  }
}
