// Imports
import axios from 'axios'
import queryBuilder from 'gql-query-builder'

// App Imports
import { API_URL } from '../../../../setup/config/env'

// Invite user to organization
export function submit(invite) {
  return dispatch => {
    return axios.post(API_URL, queryBuilder({
      type: 'mutation',
      operation: 'feedbackCreateOrUpdate',
      data: invite,
      fields: ['_id']
    }))
  }
}
