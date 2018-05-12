// Imports
import express from 'express'

// App Imports
import database from './setup/server/database'
import loadModules from './setup/server/load-modules'
import graphQL from './setup/server/graphql'
import upload from './setup/server/upload'
import startServer from './setup/server/start-server'

// Create express server
const server = express()

// Connect
database()

// Setup load modules
loadModules(server)

// Setup uploads
upload(server)

// Setup GraphQL
graphQL(server)

// Start server
startServer(server)
