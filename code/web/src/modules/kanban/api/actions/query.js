// Imports
import axios from 'axios'

// App Imports
import { API_URL } from '../../../../setup/config/env'
import { MESSAGE_SHOW } from '../../../common/api/actions'
import { KANBAN_SINGLE_CACHE, KANBAN_LIST_BY_PROJECT_CACHE } from './cache-keys'
import {
  SINGLE_REQUEST,
  SINGLE_RESPONSE,
  SINGLE_DONE,
  LIST_BY_PROJECT_REQUEST,
  LIST_BY_PROJECT_RESPONSE,
  LIST_BY_PROJECT_DONE
} from './types'

// Get single
export function get(kanbanId, isLoading = true) {
  return async dispatch => {
    // Caching
    const CACHE_KEY = `${ KANBAN_SINGLE_CACHE }.${ kanbanId }`

    try {
      const item = JSON.parse(window.localStorage.getItem(CACHE_KEY))

      if(item) {
        dispatch({
          type: SINGLE_RESPONSE,
          item
        })
      } else {
        dispatch({
          type: SINGLE_REQUEST,
          isLoading
        })
      }
    } catch(e) {
      dispatch({
        type: SINGLE_REQUEST,
        isLoading
      })
    }

    try {
      const { data } = await axios.post(API_URL, {
        operation: 'kanban',
        params: { id: kanbanId },
        fields: {
          kanban: ['_id',  'status', 'highlight', 'createdAt'],
          candidate: ['_id', 'name', 'email', 'mobile', 'experience', 'resume', 'salaryCurrent', 'salaryExpected'],
          project: ['_id', 'name'],
          job: ['_id', 'role', 'description'],
          interview: ['_id', 'dateTime', 'mode', 'note'],
          interviewer: ['_id', 'name', 'email', 'mobile'],
          feedback: ['_id', 'text', 'status'],
        }
      })

      if(data.errors && data.errors.length > 0) {
        dispatch({
          type: MESSAGE_SHOW,
          message: data.errors[0].message
        })
      } else {
        const item = data.data

        dispatch({
          type: SINGLE_RESPONSE,
          item
        })

        window.localStorage.setItem(CACHE_KEY, JSON.stringify(item))
      }
    } catch(error) {
      dispatch({
        type: MESSAGE_SHOW,
        message: 'Some error occurred. Please try again.'
      })
    } finally {
      dispatch({
        type: SINGLE_DONE,
        isLoading: false
      })
    }
  }
}

// Get by Project
export function getListByProject({ projectId }, isLoading = true, forceRefresh = false) {
  return async dispatch => {
    // Caching
    const CACHE_KEY = `${ KANBAN_LIST_BY_PROJECT_CACHE }.${ projectId }`

    try {
      const list = JSON.parse(window.localStorage.getItem(CACHE_KEY))

      if(list && !forceRefresh) {
        dispatch({
          type: LIST_BY_PROJECT_RESPONSE,
          list
        })
      } else {
        dispatch({
          type: LIST_BY_PROJECT_REQUEST,
          isLoading
        })
      }
    } catch(e) {
      dispatch({
        type: LIST_BY_PROJECT_REQUEST,
        isLoading
      })
    }

    try {
      const { data } = await axios.post(API_URL, {
        operation: 'kanbansByProject',
        params: { projectId },
        fields: {
          kanban: ['_id', 'status', 'highlight', 'createdAt'],
          candidate: ['_id', 'name', 'mobile', 'experience'],
          job: ['_id', 'role', 'description'],
          interview: ['_id', 'dateTime', 'mode', 'note'],
          interviewer: ['_id', 'name'],
          feedback: ['_id', 'text', 'status']
        }
      })

      if(data.errors && data.errors.length > 0) {
        dispatch({
          type: MESSAGE_SHOW,
          message: data.errors[0].message
        })
      } else {
        const list = data.data

        dispatch({
          type: LIST_BY_PROJECT_RESPONSE,
          list
        })

        window.localStorage.setItem(CACHE_KEY, JSON.stringify(list))
      }
    } catch(error) {
      dispatch({
        type: MESSAGE_SHOW,
        message: 'Some error occurred. Please try again.'
      })
    } finally {
      dispatch({
        type: LIST_BY_PROJECT_DONE,
        isLoading: false
      })
    }
  }
}
