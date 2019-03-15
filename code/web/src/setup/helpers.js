// UI Imports
import grey from '@material-ui/core/colors/grey'
import red from '@material-ui/core/colors/red'
import blue from '@material-ui/core/colors/blue'
import green from '@material-ui/core/colors/green'
import purple from '@material-ui/core/colors/purple'
import pink from '@material-ui/core/colors/pink'
import orange from '@material-ui/core/colors/orange'

// Helpers

// Render element or component by provided condition
export function renderIf(condition, renderFn) {
  return condition ? renderFn() : null
}

export function avatarColor(firstName = '', lastName = '') {
  if(firstName.length === 0) {
    return grey[400]
  } else {
    const colors = [
      red[500], green[500], purple[500], blue[500], pink[500], orange[500]
    ]

    return colors[(firstName.length + lastName.length) % colors.length]
  }
}

export function avatarLetter(firstName = '', lastName = '') {
  return firstName.substr(0, 1).toUpperCase() + lastName.substr(0, 1).toUpperCase()
}

// Substring with ...
export function subString(string, length = 0) {
  return string.length > length ? `${ string.substr(0, length) }...` : string
}

// Duplicate object
export function duplicate(object) {
  return Object.assign({}, object)
}

// Return empty string if value is null
export function nullToEmptyString(value) {
  return value || ''
}

// Return zero if value is null
export function nullToZero(value) {
  return value === null ? 0 : value
}

// Add (s) to any string by count
export function plural(value) {
  return value === 1 ? '' : 's'
}

// Check if object is empty
export function isEmpty(obj) {
  let name
  for (name in obj) {
    if (obj.hasOwnProperty(name)) {
      return false
    }
  }
  return true
}

// Auth Check
export function authCheck(auth) {
  return auth.user && auth.user._id
}

// Slug
export function slug(text) {
  return text.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-')
}
