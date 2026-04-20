/**
 * Ops notification email — fires on every signup so Abhinav sees it in real time.
 * Plain, scannable, no brand dress-up. Just the data + a reply-to that goes to
 * the registrant.
 */

interface Props {
  firstName: string
  email: string
  cohortLabel: string
  forumPatient: boolean
}

export function renderOpsEmail({ firstName, email, cohortLabel, forumPatient }: Props): string {
  return `<!doctype html>
<html>
<body style="margin:0;padding:32px;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,monospace;background:#f9f9f9;color:#111;">
  <div style="max-width:520px;margin:0 auto;background:#fff;padding:28px;border:1px solid #e5e5e5;border-radius:8px;">
    <div style="font-size:11px;letter-spacing:1.8px;color:#6b7280;margin-bottom:16px;">
      NEW SIGNUP · THE HORMONE METHOD
    </div>
    <h1 style="font-size:22px;margin:0 0 20px 0;font-family:-apple-system,system-ui,sans-serif;">
      ${escapeHtml(firstName)} just signed up
    </h1>
    <table style="width:100%;border-collapse:collapse;font-size:13px;">
      <tr><td style="padding:8px 0;color:#6b7280;width:120px;">First name</td><td style="padding:8px 0;">${escapeHtml(firstName)}</td></tr>
      <tr><td style="padding:8px 0;color:#6b7280;">Email</td><td style="padding:8px 0;"><a href="mailto:${escapeHtml(email)}" style="color:#1F3A2E;">${escapeHtml(email)}</a></td></tr>
      <tr><td style="padding:8px 0;color:#6b7280;">Cohort</td><td style="padding:8px 0;">${escapeHtml(cohortLabel)}</td></tr>
      <tr><td style="padding:8px 0;color:#6b7280;">Forum patient</td><td style="padding:8px 0;">${forumPatient ? 'Yes — $50 off applies' : 'No'}</td></tr>
      <tr><td style="padding:8px 0;color:#6b7280;">Submitted</td><td style="padding:8px 0;">${new Date().toISOString()}</td></tr>
    </table>
    <p style="font-size:11px;color:#6b7280;margin:24px 0 0 0;">
      Reply to this email to message ${escapeHtml(firstName)} directly.
    </p>
  </div>
</body>
</html>`
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
