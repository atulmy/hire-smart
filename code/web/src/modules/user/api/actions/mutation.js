// Imports
import axios from 'axios/index'

// App Imports
import { API_URL } from '../../../../setup/config/env'
import { MESSAGE_SHOW } from '../../../common/api/actions'
import { LOGIN_REQUEST, LOGIN_RESPONSE, SET_USER, LOGOUT } from './types'

// Login
export function login(userCredentials, isLoading = true) {
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
      const { data } = await axios.post(API_URL, {
        operation: 'userLogin',
        params: userCredentials,
      })

      if(data.success) {
        const token = data.data.token
        const user = data.data.user

        dispatch(setUser(token, user))

        loginSetUserLocalStorage(token, user)
      }

      dispatch({
        type: MESSAGE_SHOW,
        message: data.message
      })

      dispatch({
        type: LOGIN_RESPONSE,
        error: data.message
      })
    } catch(error) {
      dispatch({
        type: LOGIN_RESPONSE,
        error: 'Please try again'
      })
    }
  }
}

// Log out user and remove token from localStorage
export function logout() {
  return dispatch => {
    logoutUnsetUserLocalStorage()

    delete axios.defaults.headers.common['Authentication'];

    dispatch({
      type: LOGOUT
    })

    dispatch({
      type: 'RESET'
    })

    // Clear cache
    for(let key in localStorage) {
      if(key.indexOf('CACHE.KEY.') !== -1) {
        window.localStorage.removeItem(key)
      }
    }
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
      const { data } = await axios.post(API_URL, {
        operation: 'userStartNow'
      })

      let message = ''

      if (data.errors && data.errors.length > 0) {
        message = data.errors[0].message
      } else if (data.data.token !== '') {
        const token = data.data.token
        const user = data.data.user

        dispatch(setUser(token, user))

        loginSetUserLocalStorage(token, user)

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

// Verify send email code
export function verifySendCode(user) {
  return dispatch => {
    return axios.post(API_URL, {
      operation: 'userVerifySendCode',
      params: user,
    })
  }
}

// Verify email code
export function verifyCode(data) {
  return dispatch => {
    return axios.post(API_URL, {
      operation: 'userVerifyCode',
      params: data
    })
  }
}

// Verify update account details
export function verifyUpdateAccount(details, isLoading = true) {
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
      const { data } = await axios.post(API_URL, {
        operation: 'userVerifyUpdateAccount',
        params: details,
      })

      let message = ''

      if (data.errors && data.errors.length > 0) {
        message = data.errors[0].message
      } else if (data.data.token !== '') {
        const token = data.data.token
        const user = data.data.user

        dispatch(setUser(token, user))

        loginSetUserLocalStorage(token, user)

        message = data.data.message
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

// Accept invitation
export function acceptInvite(invite, isLoading = true) {
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
      const { data } = await axios.post(API_URL, {
        operation: 'userAcceptInvite',
        params: invite
      })

      let message = ''

      if (data.errors && data.errors.length > 0) {
        message = data.errors[0].message
      } else if (data.data.token !== '') {
        const token = data.data.token
        const user = data.data.user

        dispatch(setUser(token, user))

        loginSetUserLocalStorage(token, user)

        message = data.data.message
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

// Update account details
export function update(details, isLoading = true) {
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
      const { data } = await axios.post(API_URL, {
        operation: 'userUpdate',
        params: details,
      })

      let message = ''

      if (data.errors && data.errors.length > 0) {
        message = data.errors[0].message
      } else if (data.data.token !== '') {
        const token = data.data.token
        const user = data.data.user

        dispatch(setUser(token, user))

        loginSetUserLocalStorage(token, user)

        message = data.message
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

// Reset password email code
export function resetPasswordSendCode(data) {
  return dispatch => {
    return axios.post(API_URL, {
      operation: 'userResetPasswordSendCode',
      params: data
    })
  }
}

// Reset password verify code
export function resetPasswordVerifyCode(data) {
  return dispatch => {
    return axios.post(API_URL, {
      operation: 'userResetPasswordVerifyCode',
      params: data
    })
  }
}

// Verify update account details
export function resetPasswordUpdate(details, isLoading = true) {
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
      const { data } = await axios.post(API_URL, {
        operation: 'userResetPasswordUpdate',
        params: details,
      })

      let message = ''

      if (data.errors && data.errors.length > 0) {
        message = data.errors[0].message
      } else if (data.data.token !== '') {
        const token = data.data.token
        const user = data.data.user

        dispatch(setUser(token, user))

        loginSetUserLocalStorage(token, user)

        message = data.message
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

// Set a user auth header after login
export function setUser(token, user) {
  if (token) {
    axios.defaults.headers.common['Authentication'] = `Bearer ${token}`
  } else {
    delete axios.defaults.headers.common['Authentication']
  }

  return { type: SET_USER, user }
}

// Set user token and info in localStorage and cookie
export function loginSetUserLocalStorage(token, user) {
  // Update token
  window.localStorage.setItem('token', token)
  window.localStorage.setItem('user', JSON.stringify(user))
}

// Unset user token and info in localStorage and cookie
export function logoutUnsetUserLocalStorage() {
  // Remove token
  window.localStorage.removeItem('token')
  window.localStorage.removeItem('user')
}
