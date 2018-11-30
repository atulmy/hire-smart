// Imports
import axios from 'axios'

// App Imports
import { API_URL } from '../../../../setup/config/env'

// Invite user to organization
export function inviteToOrganization(invite) {
  return dispatch => {
    return axios.post(API_URL, {
      operation: 'inviteToOrganization',
      params: invite,
    })
  }
}
