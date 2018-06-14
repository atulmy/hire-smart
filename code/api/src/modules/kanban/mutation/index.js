// Imports
import { GraphQLString, GraphQLList } from 'graphql'

// App Imports
import KanbanType from '../types'
import { create, remove, update, updateStatus } from './resolvers'

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

  interviews: {
    name: 'interviews',
    type: GraphQLList(GraphQLString)
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

// Kanban update
export const kanbanUpdateStatus = {
  type: KanbanType,
  args: {
    id: {
      name: 'id',
      type: GraphQLString
    },

    ...fields
  },
  resolve: updateStatus
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
