// Actions Types
import axios from 'axios/index'
import { API_URL } from '../../../setup/config/env'

export const DRAWER_SHOW = 'COMMON/DRAWER_SHOW'
export const DRAWER_HIDE = 'COMMON/DRAWER_HIDE'
export const MESSAGE_SHOW = 'COMMON/MESSAGE_SHOW'
export const MESSAGE_HIDE = 'COMMON/MESSAGE_HIDE'

// Actions
export function drawerShow() {
  return { type: DRAWER_SHOW }
}

export function drawerHide() {
  return { type: DRAWER_HIDE }
}

export function messageShow(message) {
  return { type: MESSAGE_SHOW, message }
}

export function messageHide() {
  return { type: MESSAGE_HIDE }
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

