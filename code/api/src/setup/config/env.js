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

// Email
export const EMAIL_TEST = process.env.EMAIL_TEST
export const EMAIL_HOST = process.env.EMAIL_HOST
export const EMAIL_USER = process.env.EMAIL_USER
export const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD
