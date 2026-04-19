import { useState } from 'react'
import { PageShell, ProgressBar, H1, PrimaryButton } from '../ui'

// §3 · Step 4 — /onboarding/timezone
export default function OnboardingTimezone() {
  const detected =
    typeof Intl !== 'undefined'
      ? Intl.DateTimeFormat().resolvedOptions().timeZone
      : 'America/New_York'
  const [tz, setTz] = useState(detected)
  const [editing, setEditing] = useState(false)

  return (
    <PageShell maxWidth="max-w-xl">
      <ProgressBar value={4} total={5} />
      <H1>What time zone are you in?</H1>

      <div className="bg-white border border-border rounded-2xl p-6 mb-6">
        <div className="font-mono text-[10px] text-slate tracking-widest uppercase mb-2">Detected</div>
        <div className="font-display text-[26px] text-forest leading-tight">{tz}</div>
        <div className="text-[13px] text-slate mt-1">
          Looks like you're in {tz}. Is that right?
        </div>

        {!editing ? (
          <div className="flex flex-wrap gap-3 mt-5">
            <PrimaryButton onClick={() => setEditing(false)}>Yes, that's right →</PrimaryButton>
            <button
              onClick={() => setEditing(true)}
              className="text-[14px] text-forest hover:underline underline-offset-4"
            >
              No, change time zone →
            </button>
          </div>
        ) : (
          <select
            value={tz}
            onChange={(e) => setTz(e.target.value)}
            className="mt-5 w-full bg-white border border-border rounded-xl px-4 py-3 text-[15px] text-ink focus:border-forest focus:outline-none"
          >
            <option value="America/Los_Angeles">America/Los_Angeles (PT)</option>
            <option value="America/Denver">America/Denver (MT)</option>
            <option value="America/Chicago">America/Chicago (CT)</option>
            <option value="America/New_York">America/New_York (ET)</option>
            <option value="Europe/London">Europe/London</option>
            <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
            <option value="Asia/Singapore">Asia/Singapore</option>
            <option value="Australia/Sydney">Australia/Sydney</option>
          </select>
        )}
      </div>

      <p className="text-body-md text-slate leading-relaxed mb-10">
        All session times will be shown in your local time. Sessions run 7:00–8:15pm ET — for you,
        that's <span className="text-forest font-medium">calculated local time</span> each evening.
      </p>

      <PrimaryButton to="/preview/onboarding/preferences">Continue →</PrimaryButton>
    </PageShell>
  )
}
