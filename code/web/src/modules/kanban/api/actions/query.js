// Imports
import axios from 'axios'
import queryBuilder from 'gql-query-builder'

// App Imports
import { API_URL } from '../../../../setup/config/env'
import { MESSAGE_SHOW } from '../../../common/api/actions'
import { KANBAN_LIST_CACHE, KANBAN_SINGLE_CACHE, KANBAN_LIST_BY_PROJECT_CACHE } from './cache-keys'
import {
  LIST_REQUEST,
  LIST_RESPONSE,
  LIST_DONE,
  SINGLE_REQUEST,
  SINGLE_RESPONSE,
  SINGLE_DONE,
  LIST_BY_PROJECT_REQUEST,
  LIST_BY_PROJECT_RESPONSE,
  LIST_BY_PROJECT_DONE
} from './types'

// Get list
export function getList(isLoading = true) {
  return async dispatch => {
    // Caching
    try {
      const list = JSON.parse(window.localStorage.getItem(KANBAN_LIST_CACHE))

      if(list) {
        dispatch({
          type: LIST_RESPONSE,
          list
        })
      } else {
        dispatch({
          type: LIST_REQUEST,
          isLoading
        })
      }
    } catch(e) {
      dispatch({
        type: LIST_REQUEST,
        isLoading
      })
    }

    try {
      const { data } = await axios.post(API_URL, queryBuilder({
        type: 'query',
        operation: 'kanbansByOrganization',
        fields: [
          '_id',
          'projectId { _id, name }',
          'candidateId { _id, name, jobId { _id, role, description } }',
          'interviews { _id, dateTime, mode, note }',
          'status',
          'highlight',
          'createdAt'
        ]
      }))

      if(data.errors && data.errors.length > 0) {
        dispatch({
          type: MESSAGE_SHOW,
          message: data.errors[0].message
        })
      } else {
        const list = data.data.kanbansByOrganization

        dispatch({
          type: LIST_RESPONSE,
          list
        })

        window.localStorage.setItem(KANBAN_LIST_CACHE, JSON.stringify(list))
      }
    } catch(error) {
      dispatch({
        type: MESSAGE_SHOW,
        message: 'Some error occurred. Please try again.'
      })
    } finally {
      dispatch({
        type: LIST_DONE,
        isLoading: false
      })
    }
  }
}

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
      const { data } = await axios.post(API_URL, queryBuilder({
        type: 'query',
        operation: 'kanban',
        data: { id: kanbanId },
        fields: [
          '_id',
          'candidateId { _id, projectId { _id, name }, jobId { _id, role, description }, name, email, mobile, experience, resume, salaryCurrent, salaryExpected }',
          'interviews { _id, interviewerId { _id, name, email, mobile }, feedbackId { _id, text, status }, dateTime, mode, note }',
          'status',
          'highlight',
          'createdAt'
        ]
      }))

      if(data.errors && data.errors.length > 0) {
        dispatch({
          type: MESSAGE_SHOW,
          message: data.errors[0].message
        })
      } else {
        const item = data.data.kanban

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
      const { data } = await axios.post(API_URL, queryBuilder({
        type: 'query',
        operation: 'kanbansByProject',
        data: { projectId },
        fields: [
          '_id',
          'candidateId { _id, name, mobile, experience, jobId { _id, role, description } }',
          'interviews { _id, interviewerId { _id, name }, feedbackId { _id, text, status }, dateTime, mode, note }',
          'status',
          'highlight',
          'createdAt'
        ]
      }))

      if(data.errors && data.errors.length > 0) {
        dispatch({
          type: MESSAGE_SHOW,
          message: data.errors[0].message
        })
      } else {
        const list = data.data.kanbansByProject

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
