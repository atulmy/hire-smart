// Imports
import nodemailer from 'nodemailer'

// App Imports
import { EMAIL_HOST, EMAIL_USER, EMAIL_PASSWORD } from '../config/env'

// email
function transport() {
  if(EMAIL_HOST && EMAIL_USER && EMAIL_PASSWORD) {
    return nodemailer.createTransport({
      host: EMAIL_HOST,
      secure: false,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASSWORD
      }
    })
  }
}

export default transport()
