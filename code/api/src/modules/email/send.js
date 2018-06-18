// Imports
import nodemailer from 'nodemailer'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

// App Imports
import { EMAIL_HOST, EMAIL_USER, EMAIL_PASSWORD, EMAIL_TEST, NODE_ENV } from '../../setup/config/env'
import params from '../../setup/config/params'
import Email from './model'
import view from './template/view'
import Layout from './template/Layout'

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

export async function send({ to, from, subject, template, organizationId = '', userId = '' }) {
  const transporter = transport()

  if(transporter) {
    // Create markup
    const body = view(renderToStaticMarkup(
      <Layout>
        { template }
      </Layout>
    ))

    subject = `${ params.site.name } - ${ subject }`

    // Send email
    transporter.sendMail({
      to: `"${ to.name }" <${ NODE_ENV === 'development' ? EMAIL_TEST : to.email }>`,
      from: `"${ from.name }" <${ from.email }>`,
      subject,
      html: body
    }, () => {
      console.info('INFO - Email sent.')
    })

    // Save into database
    return await Email.create({
      organizationId,
      userId,
      toName: to.name,
      toEmail: to.email,
      fromName: from.name,
      fromEmail: from.email,
      subject,
      body
    })
  } else {
    console.warn('WARN - Email not sent. Please check `.env` to set email configurations.')
  }
}
