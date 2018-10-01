// Imports
import axios from 'axios'
import queryBuilder from 'gql-query-builder'

// App Imports
import { API_URL } from '../../../../setup/config/env'

// Actions

// Get list by organization
export function getListByOrganization() {
  return dispatch => {
    return axios.post(API_URL, queryBuilder({
      type: 'query',
      operation: 'usersByOrganization',
      fields: ['_id', 'name', 'email', 'admin', 'createdAt']
    }))
  }
}
