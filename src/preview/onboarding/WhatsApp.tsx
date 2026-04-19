import { useState } from 'react'
import { PageShell, ProgressBar, H1, PrimaryButton, GhostButton } from '../ui'

// §3 · Step 3 — /onboarding/whatsapp
// The crucial trust moment. Server sends hormone_welcome_v1 template.
// Dashboard polls every 5s checking whatsappOptedIn.
export default function OnboardingWhatsApp() {
  const [waiting, setWaiting] = useState(true)

  return (
    <PageShell maxWidth="max-w-xl">
      <ProgressBar value={3} total={5} />
      <H1>Open WhatsApp and say hi to Coach Kai.</H1>

      <p className="text-body-md text-slate leading-relaxed mb-10">
        We just sent a message from Coach Kai to your WhatsApp. Open it and reply{' '}
        <span className="font-mono text-forest bg-sand px-2 py-0.5 rounded">YES</span> to start. This
        is the only place Coach Kai lives — not buried in this app.
      </p>

      {/* Phone mock */}
      <div className="bg-forest rounded-[32px] p-3 max-w-[320px] mx-auto mb-8">
        <div className="bg-white rounded-[24px] overflow-hidden">
          <div className="bg-[#075E54] text-white px-4 py-3 text-[13px] flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-coral flex items-center justify-center font-display text-[14px]">
              K
            </div>
            <div>
              <div className="font-medium">Coach Kai</div>
              <div className="text-[11px] text-white/70">online</div>
            </div>
          </div>
          <div className="bg-[#ECE5DD] p-4 space-y-2 min-h-[220px]">
            <div className="bg-white rounded-xl px-3 py-2 text-[13px] text-ink max-w-[85%] shadow-sm">
              Hi Sarah 👋 I'm Coach Kai. I'll be your guide through The Hormone Method by Forum Health. Reply YES to
              confirm you got this and we'll get started.
            </div>
            <div className="text-[10px] text-slate/70 text-center pt-2">wa.me/+14155551234</div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center mb-6">
        <a
          href="https://wa.me/14155551234?text=YES"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 bg-[#25D366] text-white text-[15px] px-6 py-3 rounded-full hover:bg-[#1ea952]"
        >
          Open WhatsApp →
        </a>
        <GhostButton onClick={() => setWaiting(false)}>I'll do this later →</GhostButton>
      </div>

      <div className="text-[12px] text-slate italic leading-relaxed mb-10 max-w-[480px]">
        Coach Kai is built on the clinical methodology of Dr. Saxena. She does not diagnose or
        prescribe — she helps you prepare, reflect, and ask the right questions.
      </div>

      <div className="pt-5 border-t border-border/60">
        <div className="flex items-center gap-3 text-[13px] text-slate mb-4">
          <span
            className={`w-2 h-2 rounded-full ${waiting ? 'bg-coral animate-pulse' : 'bg-forest'}`}
          />
          {waiting
            ? 'Waiting for your WhatsApp reply…'
            : 'Opt-in skipped for now — you can finish this in Account.'}
        </div>
        <PrimaryButton to="/preview/onboarding/timezone">Continue →</PrimaryButton>
      </div>
    </PageShell>
  )
}
