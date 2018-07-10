// Imports
import { GraphQLString, GraphQLList } from 'graphql'

// App Imports
import KanbanType from '../types'
import { getAll, get, getByProject } from './resolvers'

// Get all
export const kanbans = {
  type: new GraphQLList(KanbanType),
  resolve: getAll
}

// Get by id
export const kanban = {
  type: KanbanType,
  args: {
    id: { type: GraphQLString }
  },
  resolve: get
}

// Get by project
export const kanbansByProject = {
  type: new GraphQLList(KanbanType),
  args: {
    projectId: { type: GraphQLString }
  },
  resolve: getByProject
}
