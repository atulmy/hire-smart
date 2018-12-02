// App Imports
import params from '../config/params'

// Utility functions

// Slug
export function slug(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    //.replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '')            // Trim - from end of text
}

// Generate random number
export function randomNumber(low, high) {
  return Math.floor(Math.random() * (high - low) + low);
}

// Auth check user
export function authCheck(auth) {
  return auth && auth.user && auth.user._id
}

// Auth check Admin
export function authCheckAdmin(auth) {
  return authCheck(auth) && auth.user.role === params.user.roles.admin.key
}

// No operation
export const noop = () => {}
