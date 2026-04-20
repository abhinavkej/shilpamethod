/**
 * Vercel Serverless Function — POST /api/register
 *
 * The first real backend endpoint. Accepts the Registration form submission
 * from src/components/Registration.tsx, fires:
 *   1. A welcome email to the user (Resend)
 *   2. A notification email to ops (abhinavkej@gmail.com) so we see every signup
 *
 * Required env var in Vercel:
 *   RESEND_API_KEY   — https://resend.com → API keys (free tier, 3000/mo)
 *
 * Optional env vars:
 *   EMAIL_FROM             — defaults to Resend's sandbox sender
 *   EMAIL_OPS_NOTIFICATION — defaults to abhinavkej@gmail.com
 *
 * Until RESEND_API_KEY is set, the endpoint returns 503 with a clear
 * error telling you what's missing. Once set, emails actually send.
 */

import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Resend } from 'resend'
import { renderWelcomeEmail } from '../lib/emails/welcome.js'
import { renderOpsEmail } from '../lib/emails/ops.js'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS for local dev / preview domains
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(204).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { firstName, email, forumPatient, cohort } = req.body || {}

  // Minimal validation
  if (!firstName || typeof firstName !== 'string' || firstName.length > 100) {
    return res.status(400).json({ error: 'First name is required' })
  }
  if (!email || typeof email !== 'string' || !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ error: 'Valid email is required' })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    // Still log the attempt so a real submission while keys are missing isn't lost
    console.log('[register] RESEND_API_KEY missing. Submission:', {
      firstName,
      email,
      forumPatient,
      cohort,
      at: new Date().toISOString(),
    })
    return res.status(503).json({
      error: 'Email service is not configured yet.',
      hint: 'Set RESEND_API_KEY in Vercel env vars. See HANDOFF.md §2.4.',
    })
  }

  const resend = new Resend(apiKey)
  const fromAddress = process.env.EMAIL_FROM || 'Coach Kai <onboarding@resend.dev>'
  const opsAddress = process.env.EMAIL_OPS_NOTIFICATION || 'abhinavkej@gmail.com'
  const replyTo = process.env.EMAIL_REPLY_TO || 'hello@shilpamethod.com'

  try {
    const cohortLabel =
      cohort === 'c2'
        ? 'Cohort 2 · 8 AM PST / 11 AM EST / 8:30 PM IST'
        : 'Cohort 1 · 5 PM PST / 8 PM EST / 5:30 AM IST (next day)'

    // 1) Welcome email to the registrant
    const welcomeResult = await resend.emails.send({
      from: fromAddress,
      to: email,
      replyTo,
      subject: `You're in, ${firstName}.`,
      html: renderWelcomeEmail({ firstName, cohortLabel, forumPatient: !!forumPatient }),
    })

    // 2) Notification email to ops so you see every signup as it happens
    const opsResult = await resend.emails.send({
      from: fromAddress,
      to: opsAddress,
      replyTo: email,
      subject: `[Signup] ${firstName} (${email}) — ${cohortLabel}`,
      html: renderOpsEmail({ firstName, email, cohortLabel, forumPatient: !!forumPatient }),
    })

    return res.status(200).json({
      ok: true,
      welcomeEmailId: welcomeResult.data?.id,
      opsEmailId: opsResult.data?.id,
    })
  } catch (err: any) {
    console.error('[register] send failed:', err)
    return res.status(500).json({
      error: 'Failed to send email',
      detail: err?.message || String(err),
    })
  }
}
