// Imports
import { compose, combineReducers } from 'redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

// App Imports
import common from '../modules/common/api/state'
import user from '../modules/user/api/state'
import * as organization from '../modules/organization/api/state'
import * as project from '../modules/project/api/state'
import * as job from '../modules/job/api/state'
import * as candidate from '../modules/candidate/api/state'
import * as interviewer from '../modules/interviewer/api/state'
import * as interview from '../modules/interview/api/state'
import * as kanban from '../modules/kanban/api/state'
import * as invite from '../modules/invite/api/state'
import * as activity from '../modules/activity/api/state'

// App Reducer
const appReducer = combineReducers({
  common,
  user,
  ...organization,
  ...project,
  ...job,
  ...candidate,
  ...interviewer,
  ...interview,
  ...kanban,
  ...invite,
  ...activity
})

// Root Reducer
export const rootReducer = (state, action) => {
  if (action.type === 'RESET') {
    state = undefined
  }

  return appReducer(state, action)
}

// Load initial state from server side
let initialState
if (typeof window !== 'undefined') {
  initialState = window.__INITIAL_STATE__
  delete window.__INITIAL_STATE__
}

// Store
export const store = createStore(
  rootReducer,
  initialState,

  compose(
    applyMiddleware(thunk),
  )
)
