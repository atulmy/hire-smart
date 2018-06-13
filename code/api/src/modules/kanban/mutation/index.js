// Imports
import { GraphQLString } from 'graphql'

// App Imports
import KanbanType from '../types'
import { create, remove, update } from './resolvers'

// Kanban fields
const fields = {
  clientId: {
    name: 'clientId',
    type: GraphQLString
  },

  candidateId: {
    name: 'candidateId',
    type: GraphQLString
  },

  interviewId: {
    name: 'interviewId',
    type: GraphQLString
  },

  status: {
    name: 'status',
    type: GraphQLString
  },

  highlight: {
    name: 'highlight',
    type: GraphQLString
  }
}

// Kanban create
export const kanbanCreate = {
  type: KanbanType,
  args: fields,
  resolve: create
}

// Kanban update
export const kanbanUpdate = {
  type: KanbanType,
  args: {
    id: {
      name: 'id',
      type: GraphQLString
    },

    ...fields
  },
  resolve: update
}

// Kanban remove
export const kanbanRemove = {
  type: KanbanType,
  args: {
    id: {
      name: 'id',
      type: GraphQLString
    }
  },
  resolve: remove
}
