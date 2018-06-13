// Imports
import { GraphQLString, GraphQLList } from 'graphql'

// App Imports
import PanelType from '../types'
import { getAll, get, getByUser, getByOrganization, getByClient } from './resolvers'

// Get all
export const panels = {
  type: new GraphQLList(PanelType),
  resolve: getAll
}

// Get by id
export const panel = {
  type: PanelType,
  args: {
    id: { type: GraphQLString }
  },
  resolve: get
}

// Get by user
export const panelsByUser = {
  type: new GraphQLList(PanelType),
  resolve: getByUser
}

// Get by organization
export const panelsByOrganization = {
  type: new GraphQLList(PanelType),
  resolve: getByOrganization
}

// Get by client
export const panelsByClient = {
  type: new GraphQLList(PanelType),
  args: {
    clientId: { type: GraphQLString }
  },
  resolve: getByClient
}
