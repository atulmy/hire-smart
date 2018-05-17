// Imports
import dotenv from 'dotenv'

// Load .env
dotenv.config()

// Environment
export const NODE_ENV = process.env.NODE_ENV

// Port
export const PORT = process.env.PORT

// Mongo URL
export const MONGO_URL = process.env.MONGO_URL
