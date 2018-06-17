// Imports
import nodemailer from 'nodemailer'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

// App Imports
import { EMAIL_HOST, EMAIL_USER, EMAIL_PASSWORD, EMAIL_TEST, NODE_ENV } from '../config/env'
import params from '../config/params'
import view from '../../modules/email/view'
import Layout from '../../modules/email/templates/Layout'

// email
export function transport() {
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

export function sendEmail({ from, to, subject, template }) {
  const transporter = transport()

  if(transporter) {
    const html = view(renderToStaticMarkup(
      <Layout>
        { template }
      </Layout>
    ))

    transporter.sendMail({
      from: `"${ from.name }" <${ from.email }>`,
      to: `"${ to.name }" <${ NODE_ENV === 'development' ? EMAIL_TEST : to.email }>`,
      subject: `${ params.site.name } - ${ subject }`,
      html: view(html)
    })
  } else {
    console.warn('WARN - Email not sent. Please check `.env` to set email configurations.')
  }
}
