/**
 * Vercel Serverless Function — POST /api/register
 *
 * Fires TWO email paths in parallel so something always lands:
 *
 *   1. Formsubmit.co (zero-config fallback — always fires)
 *      POSTs the form data to https://formsubmit.co/ajax/<email>.
 *      First submission triggers an activation email to
 *      abhinavkej@gmail.com; click once and future submissions flow
 *      through automatically. No API key, no signup required.
 *
 *   2. Resend (designed path — fires if RESEND_API_KEY is set)
 *      Sends the Cormorant/cream/coral welcome email to the user
 *      AND a separate ops notification to abhinavkej@gmail.com.
 *      Prettier, two-way. Takes ~3 min to set up.
 *
 * The endpoint returns 200 as long as AT LEAST ONE path succeeded.
 * Every submission is also logged to Vercel function logs so nothing
 * is lost even in a total outage.
 */

import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Resend } from 'resend'
import { renderWelcomeEmail } from '../lib/emails/welcome.js'
import { renderOpsEmail } from '../lib/emails/ops.js'

const FORMSUBMIT_INBOX = 'abhinavkej@gmail.com'
const BASE_URL = 'https://www.shilpamethod.com'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(204).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { firstName, email, forumPatient, cohort } = req.body || {}

  if (!firstName || typeof firstName !== 'string' || firstName.length > 100) {
    return res.status(400).json({ error: 'First name is required' })
  }
  if (!email || typeof email !== 'string' || !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ error: 'Valid email is required' })
  }

  const cohortLabel =
    cohort === 'c2'
      ? 'Cohort 2 · 8 AM PST / 11 AM EST / 8:30 PM IST'
      : 'Cohort 1 · 5 PM PST / 8 PM EST / 5:30 AM IST (next day)'

  // Personalized member-area deep link so the recipient (Abhinav, today) can
  // click straight into the end-to-end member preview with their name wired in.
  const memberLink = `${BASE_URL}/preview/dashboard?phase=onboarding&name=${encodeURIComponent(
    firstName
  )}`

  const submissionLog = {
    firstName,
    email,
    cohort,
    cohortLabel,
    forumPatient: !!forumPatient,
    memberLink,
    at: new Date().toISOString(),
  }
  console.log('[register] submission:', submissionLog)

  const results: Record<string, any> = {}

  // ───── Path 1: Formsubmit.co (zero-config, always fires) ─────
  try {
    const fsResp = await fetch(`https://formsubmit.co/ajax/${FORMSUBMIT_INBOX}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        _subject: `[Hormone Method signup] ${firstName} · ${email}`,
        _template: 'box',
        _captcha: 'false',
        name: firstName,
        email,
        cohort: cohortLabel,
        forum_patient: forumPatient ? 'Yes — $50 off applies' : 'No',
        member_access_link: memberLink,
        submitted_at: new Date().toISOString(),
      }),
    })
    results.formsubmit = {
      ok: fsResp.ok,
      status: fsResp.status,
      body: await fsResp.text().then((t) => t.slice(0, 200)),
    }
  } catch (err: any) {
    results.formsubmit = { ok: false, error: err?.message || String(err) }
  }

  // ───── Path 2: Resend (designed, only if API key is set) ─────
  const apiKey = process.env.RESEND_API_KEY
  if (apiKey) {
    const resend = new Resend(apiKey)
    const fromAddress = process.env.EMAIL_FROM || 'Coach Kai <onboarding@resend.dev>'
    const opsAddress = process.env.EMAIL_OPS_NOTIFICATION || FORMSUBMIT_INBOX
    const replyTo = process.env.EMAIL_REPLY_TO || 'hello@shilpamethod.com'

    try {
      const [welcomeResult, opsResult] = await Promise.all([
        resend.emails.send({
          from: fromAddress,
          to: email,
          replyTo,
          subject: `You're in, ${firstName}.`,
          html: renderWelcomeEmail({ firstName, cohortLabel, forumPatient: !!forumPatient }),
        }),
        resend.emails.send({
          from: fromAddress,
          to: opsAddress,
          replyTo: email,
          subject: `[Signup] ${firstName} (${email}) — ${cohortLabel}`,
          html: renderOpsEmail({ firstName, email, cohortLabel, forumPatient: !!forumPatient }),
        }),
      ])
      results.resend = {
        ok: true,
        welcomeEmailId: welcomeResult.data?.id,
        opsEmailId: opsResult.data?.id,
      }
    } catch (err: any) {
      results.resend = { ok: false, error: err?.message || String(err) }
    }
  } else {
    results.resend = { ok: false, skipped: 'RESEND_API_KEY not set' }
  }

  const anySuccess = results.formsubmit?.ok || results.resend?.ok
  return res.status(anySuccess ? 200 : 500).json({
    ok: anySuccess,
    paths: results,
    memberLink, // returned so the client can surface it on success
  })
}
