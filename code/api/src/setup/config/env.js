// Imports
import dotenv from 'dotenv'

// Load .env
dotenv.config()

// Environment
export const NODE_ENV = process.env.NODE_ENV

// Security
export const SECRET_KEY = process.env.SECRET_KEY

// Port
export const PORT = process.env.PORT

// Database
export const MONGO_URL = process.env.MONGO_URL
export const API_DOCS = process.env.API_DOCS

// URL
export const APP_URL = process.env.APP_URL
export const API_URL = process.env.API_URL

// Email
export const EMAIL_TEST = process.env.EMAIL_TEST
export const EMAIL_HOST = process.env.EMAIL_HOST
export const EMAIL_USER = process.env.EMAIL_USER
export const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD
