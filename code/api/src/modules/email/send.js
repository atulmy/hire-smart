// Imports
import nodemailer from 'nodemailer'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

// App Imports
import { EMAIL_ON, EMAIL_HOST, EMAIL_USER, EMAIL_PASSWORD, EMAIL_TEST, NODE_ENV } from '../../setup/config/env'
import params from '../../setup/config/params'
import Email from './model'
import view from './template/view'
import Layout from './template/Layout'

/**
 * Responsável por criar uma conexão com servidor de email
 * 
 * @returns conexão com SMTP
 */
function transport() {
  if (EMAIL_HOST && EMAIL_USER && EMAIL_PASSWORD) {
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

/**
 * Responsável por enviar emails
 * 
 * @param {String} to destinatário
 * @param {String} from remetente
 * @param {String} subject assunto
 * @param {String} template layout do email
 * @param {String} cc emails em copia
 * @param {String} organizationId id da organização
 * @param {String} userId id do usuário
 * @param {String} icalEvent eventos
 * @returns {Object} email 
 */
export async function send({ to, from, subject, template, cc = null, organizationId = '', userId = '', icalEvent = '' }) {
  const transporter = transport()

  if (transporter) {
    // Create markup
    const body = view(renderToStaticMarkup(
      <Layout>
        {template}
      </Layout>
    ))

    subject = `${params.site.name} - ${subject}`

    const toEmail = NODE_ENV === 'development' ? EMAIL_TEST : to.email
    const toAddress = to.name && to.name.length > 0 ? `"${to.name}" <${toEmail}>` : toEmail

    let email = {
      to: toAddress,
      from: `"${from.name}" <${params.site.emails.hello.email}>`,
      replyTo: `"${from.name}" <${from.email}>`,
      subject,
      html: body,
    }
    if (cc) {
      email.cc = `"${cc.name}" <${NODE_ENV === 'development' ? EMAIL_TEST : cc.email}>`
    }
    if (icalEvent) {
      email.icalEvent = icalEvent
    }

    // Send email
    if (EMAIL_ON === '1') {
      transporter.sendMail(email, () => {
        console.info('INFO - Email sent.')
      })
    } else {
      console.info('INFO - Email not sent. EMAIL_ON is not enabled.')
    }

    // Save into database
    let emailSave = {
      toEmail: to.email,
      fromName: from.name,
      fromEmail: from.email,
      subject,
      body
    }
    if (to.name && to.name.length > 0) {
      emailSave.toName = to.name
    }
    if (organizationId) {
      emailSave.organizationId = organizationId
    }
    if (userId) {
      emailSave.userId = userId
    }

    return await Email.create(emailSave)
  } else {
    console.warn('WARN - Email not sent. Please check `.env` to set email configurations.')
  }
}
