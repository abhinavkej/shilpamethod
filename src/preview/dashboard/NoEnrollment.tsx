// Edge case: authenticated user without an active enrollment.
// E.g., refund happened, or a magic link survived past cancellation.

import { PageShell, H1, PrimaryButton } from '../ui'

export default function NoEnrollment({ firstName = 'Sarah' }: { firstName?: string }) {
  return (
    <PageShell maxWidth="max-w-xl">
      <div className="bg-white border border-border rounded-2xl p-10 text-center">
        <p className="font-mono text-[11px] text-coral tracking-widest uppercase mb-4">
          No active program
        </p>
        <H1>You're not currently enrolled, {firstName}.</H1>
        <p className="text-body-md text-slate mb-8">
          Reserve your spot in the next cohort — or reply to a past program email if something looks
          off.
        </p>
        <PrimaryButton to="/">View next cohort →</PrimaryButton>
      </div>
    </PageShell>
  )
}
