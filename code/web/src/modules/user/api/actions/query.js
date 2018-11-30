// Imports
import axios from 'axios'

// App Imports
import { API_URL } from '../../../../setup/config/env'

// Actions

// Get list by organization
export function getListByOrganization() {
  return dispatch => {
    return axios.post(API_URL, {
      operation: 'usersByOrganization',
      fields: ['_id', 'name', 'email', 'admin', 'createdAt']
    })
  }
}
