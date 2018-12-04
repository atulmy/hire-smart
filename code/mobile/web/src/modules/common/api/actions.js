// Imports
import axios from 'axios/index'

// API Imports
import { API_URL } from '../../../setup/config/env'

// Actions Types
export const MESSAGE_SHOW = 'COMMON_MESSAGE_SHOW'
export const MESSAGE_HIDE = 'COMMON_MESSAGE_HIDE'
export const FOOTER_SELECTION = 'COMMON_FOOTER_SELECTION'

export function messageShow(message) {
  return { type: MESSAGE_SHOW, message }
}

export function messageHide() {
  return { type: MESSAGE_HIDE }
}

export function footerSelection(footer) {
  return { type: FOOTER_SELECTION, footer }
}

export function upload(data) {
  return dispatch => {
    return axios.post(`${ API_URL }/upload`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}
