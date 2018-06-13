// Imports
import { GraphQLString } from 'graphql'

// App Imports
import PanelType from '../types'
import { create, remove, update } from './resolvers'

// Panel fields
const fields = {
  clientId: {
    name: 'clientId',
    type: GraphQLString
  },

  name: {
    name: 'name',
    type: GraphQLString
  },

  email: {
    name: 'email',
    type: GraphQLString
  },

  mobile: {
    name: 'mobile',
    type: GraphQLString
  }
}

// Panel create
export const panelCreate = {
  type: PanelType,
  args: fields,
  resolve: create
}

// Panel update
export const panelUpdate = {
  type: PanelType,
  args: {
    id: {
      name: 'id',
      type: GraphQLString
    },

    ...fields
  },
  resolve: update
}

// Panel remove
export const panelRemove = {
  type: PanelType,
  args: {
    id: {
      name: 'id',
      type: GraphQLString
    }
  },
  resolve: remove
}
