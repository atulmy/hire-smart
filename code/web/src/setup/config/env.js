// Imports
import dotenv from 'dotenv'

// Load .env
dotenv.config()

// Environment
export const NODE_ENV = process.env.REACT_APP_NODE_ENV

// URL
export const WEB_URL = process.env.REACT_APP_WEB_URL
export const API_URL = process.env.REACT_APP_API_URL

// Port
export const PORT = process.env.PORT

// Contact
export const CONTACT_PHONE = process.env.REACT_APP_CONTACT_PHONE
export const CONTACT_EMAIL = process.env.REACT_APP_CONTACT_EMAIL
export const CONTACT_ADDRESS = process.env.REACT_APP_CONTACT_ADDRESS

// Misc
export const GA_TRACKING_ID = process.env.REACT_APP_GA_TRACKING_ID
