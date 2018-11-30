// Imports
import axios from 'axios'

// App Imports
import { API_URL } from '../../../../setup/config/env'

// Feedback
export function submit(invite) {
  return dispatch => {
    return axios.post(API_URL, {
      operation: 'feedbackCreateOrUpdate',
      params: invite,
    })
  }
}
