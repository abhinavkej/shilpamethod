/**
 * Welcome email rendered as raw HTML (no React Email dep — keeps bundle small
 * for the serverless function cold-start). Matches the spec in §5.2 of the
 * post-checkout PDF.
 *
 * Cormorant H1, DM Sans body, cream bg, terra CTA.
 */

interface Props {
  firstName: string
  cohortLabel: string
  forumPatient: boolean
}

export function renderWelcomeEmail({ firstName, cohortLabel, forumPatient }: Props): string {
  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>You're in, ${escapeHtml(firstName)}.</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@300;400;500&family=Inter:wght@400;500&display=swap');
  </style>
</head>
<body style="margin:0;padding:40px 20px;background:#F8F3E8;font-family:Inter,sans-serif;color:#1F3A2E;">
  <div style="max-width:560px;margin:0 auto;background:#ffffff;padding:48px 40px;border-radius:16px;">

    <!-- kicker -->
    <div style="font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,monospace;font-size:11px;letter-spacing:1.8px;color:#D97757;text-transform:uppercase;margin-bottom:16px;">
      The Hormone Method · by Forum Health
    </div>

    <!-- headline -->
    <h1 style="font-family:Fraunces,Georgia,serif;font-weight:400;font-size:40px;line-height:1.1;color:#1F3A2E;margin:0 0 24px 0;">
      You're in, ${escapeHtml(firstName)}.
    </h1>

    <!-- body copy -->
    <p style="font-size:16px;line-height:1.7;color:#1F3A2E;margin:0 0 16px 0;">
      Quick note from me — I'm Coach Kai, your guide for the three nights you've signed up for
      with Dr. Shilpa Saxena, MD (CMO of Forum Health). I'll be in touch before, during, and
      after the boot camp.
    </p>

    <p style="font-size:16px;line-height:1.7;color:#1F3A2E;margin:0 0 28px 0;">
      Your cohort: <strong>${escapeHtml(cohortLabel)}</strong>. In the next few days we'll
      confirm your session times, send the Google Meet link, and open your 10-minute intake
      — the thing Dr. Saxena reads before your weekend begins.
    </p>

    ${
      forumPatient
        ? `<p style="font-size:15px;line-height:1.7;color:#1F3A2E;margin:0 0 28px 0;padding:16px;background:#EFE7D4;border-radius:12px;">
             You flagged yourself as a Forum Health patient — your $50 discount code will
             arrive through Forum's patient communication channels within 24 hours.
           </p>`
        : ''
    }

    <!-- separator -->
    <hr style="border:none;border-top:1px solid #D9CFBE;margin:32px 0;" />

    <!-- what happens next -->
    <p style="font-size:14px;font-weight:500;color:#1F3A2E;margin:0 0 12px 0;">
      What happens next:
    </p>
    <p style="font-size:14px;line-height:1.7;color:#6B6358;margin:0 0 20px 0;">
      <strong style="color:#1F3A2E;">This week:</strong> A 10-minute intake so Dr. Saxena
      knows what to emphasize for you.<br/><br/>
      <strong style="color:#1F3A2E;">The two weeks before Day 1:</strong> Short primers and
      clips from me — designed to make the live sessions land harder.<br/><br/>
      <strong style="color:#1F3A2E;">Day 1–3:</strong> Three live nights with Dr. Saxena on
      Google Meet.<br/><br/>
      <strong style="color:#1F3A2E;">After Day 3:</strong> Your Patient Advocacy Document —
      the thing you take to your next doctor's appointment.
    </p>

    <hr style="border:none;border-top:1px solid #D9CFBE;margin:32px 0;" />

    <!-- disclaimer -->
    <p style="font-size:12px;line-height:1.6;color:#8C8478;margin:0 0 16px 0;">
      The Hormone Method Boot Camp is educational guidance, not medical advice. Participation
      does not establish a physician-patient relationship.
    </p>

    <div style="font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,monospace;font-size:10px;letter-spacing:1px;color:#8C8478;text-transform:uppercase;">
      SHILPAMETHOD.COM · COACHKAI@SHILPAMETHOD.COM
    </div>
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
