// Imports
import axios from 'axios/index'
import cookie from 'js-cookie'

// App Imports
import { queryBuilder } from '../../../../setup/helpers'
import { API_URL } from '../../../../setup/config/env'
import { MESSAGE_SHOW } from '../../../common/api/actions'
import { LOGIN_REQUEST, LOGIN_RESPONSE, SET_USER, LOGOUT } from './types'

export function login(userCredentials, isLoading = true) {
  return async dispatch => {
    dispatch({
      type: LOGIN_REQUEST,
      isLoading
    })

    try {
      const { data } = await axios.post(API_URL, queryBuilder({
        type: 'query',
        operation: 'userLogin',
        data: userCredentials,
        fields: ['user {name, email, role}', 'token']
      }))

      let error = ''

      if (data.errors && data.errors.length > 0) {
        error = data.errors[0].message
      } else if (data.data.userLogin.token !== '') {
        const token = data.data.userLogin.token
        const user = data.data.userLogin.user

        dispatch(setUser(token, user))

        loginSetUserLocalStorageAndCookie(token, user)
      }

      dispatch({
        type: LOGIN_RESPONSE,
        error
      })
    } catch(error) {
      dispatch({
        type: LOGIN_RESPONSE,
        error: 'Please try again'
      })
    }
  }
}

// Register a user
export function register(userDetails) {
  return dispatch => {
    return axios.post(API_URL, queryBuilder({
      type: 'mutation',
      operation: 'userSignup',
      data: userDetails,
      fields: ['_id', 'name', 'email']
    }))
  }
}

// Create a demo user and login
export function startNow(isLoading = true) {
  return async dispatch => {
    dispatch({
      type: LOGIN_REQUEST,
      isLoading
    })

    dispatch({
      type: MESSAGE_SHOW,
      message: 'Please wait..'
    })

    try {
      const { data } = await axios.post(API_URL, queryBuilder({
        type: 'mutation',
        operation: 'userStartNow',
        fields: ['user {name, email, role}', 'token']
      }))

      let message = ''

      if (data.errors && data.errors.length > 0) {
        message = data.errors[0].message
      } else if (data.data.userStartNow.token !== '') {
        const token = data.data.userStartNow.token
        const user = data.data.userStartNow.user

        dispatch(setUser(token, user))

        loginSetUserLocalStorageAndCookie(token, user)

        message = 'You are now logged in as a new demo user.'
      }

      dispatch({
        type: MESSAGE_SHOW,
        message
      })
    } catch(error) {
      dispatch({
        type: MESSAGE_SHOW,
        message: 'There was some server error. Please try again.'
      })
    } finally {
      dispatch({
        type: LOGIN_RESPONSE
      })
    }
  }
}

// Invite user to organization (create)
export function inviteToOrganization(userDetails) {
  return dispatch => {
    return axios.post(API_URL, queryBuilder({
      type: 'mutation',
      operation: 'userInviteToOrganization',
      data: userDetails,
      fields: ['_id']
    }))
  }
}

// Set a user after login or using localStorage token
export function setUser(token, user) {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    delete axios.defaults.headers.common['Authorization']
  }

  return { type: SET_USER, user }
}

// Set user token and info in localStorage and cookie
export function loginSetUserLocalStorageAndCookie(token, user) {
  // Update token
  window.localStorage.setItem('token', token)
  window.localStorage.setItem('user', JSON.stringify(user))

  // Set cookie for SSR
  cookie.set('auth', { token, user }, { path: '/' })
}

// Log out user and remove token from localStorage
export function logout() {
  return dispatch => {
    logoutUnsetUserLocalStorageAndCookie()

    dispatch({
      type: LOGOUT
    })

    dispatch({
      type: 'RESET'
    })
  }
}

// Unset user token and info in localStorage and cookie
export function logoutUnsetUserLocalStorageAndCookie() {
  // Remove token
  window.localStorage.removeItem('token')
  window.localStorage.removeItem('user')

  // Remove cookie
  cookie.remove('auth')
}
