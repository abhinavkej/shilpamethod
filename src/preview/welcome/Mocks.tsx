import { Link } from 'react-router-dom'
import { PageShell, Mono } from '../ui'

// Stakeholder preview — what's actually arriving on her phone + inbox.
// These mirror the exact copy in §5, §6, §9 of the post-checkout PDF.
// In prod: the email HTML lives at lib/email-templates/welcomeEmail.tsx (React Email)
// and the WhatsApp templates are Meta-approved with IDs in env vars.

export default function WelcomeMocks() {
  return (
    <PageShell maxWidth="max-w-5xl">
      <Mono className="block mb-2 text-coral">Delivery preview</Mono>
      <h1 className="font-display text-display-md text-forest mb-2">
        What's arriving on her phone and inbox.
      </h1>
      <p className="text-body-md text-slate max-w-[620px] mb-10">
        Four messages. Two fire at T+0. Two are scheduled nudges that auto-skip if she authenticates
        in time. Every line is written in Coach Kai's voice — same character everywhere.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Welcome email */}
        <section>
          <SectionHeader title="T+0 · Welcome email" tag="Resend" />
          <EmailMock
            from="Coach Kai"
            fromAddress="coachkai@shilpamethod.com"
            subject="You're in, Sarah."
            preheader="Your dashboard is one tap away — and Coach Kai just sent you a WhatsApp too."
            ctaLabel="Open my dashboard →"
            body={
              <>
                <p>
                  Quick note from me — I'm Coach Kai, the AI assistant trained on Dr. Saxena's
                  clinical methodology. I'll be your guide between now and Day 1.
                </p>
                <p>
                  You should also have a WhatsApp message from me by now. The program mostly lives
                  there — short, useful nudges, not corporate drip emails. The website is your home
                  base for the live sessions and your Patient Advocacy Document.
                </p>
                <p className="text-[12px] text-slate mt-4">
                  This link gets you in without a password. It's good for the next 24 hours.
                </p>
                <div className="mt-4 space-y-1.5 text-[13px]">
                  <p><strong className="text-forest">What happens next:</strong></p>
                  <p>
                    <strong className="text-forest">This week:</strong> A 10-minute intake so Dr.
                    Saxena knows what to emphasize for you.
                  </p>
                  <p>
                    <strong className="text-forest">Next two weeks:</strong> Short primers and clips
                    — designed to make Day 1 land harder.
                  </p>
                  <p>
                    <strong className="text-forest">June 2–4:</strong> Three live nights with Dr.
                    Saxena on Google Meet. 7:00–8:15pm Eastern.
                  </p>
                  <p>
                    <strong className="text-forest">After Day 3:</strong> Your Patient Advocacy
                    Document.
                  </p>
                </div>
              </>
            }
          />
        </section>

        {/* Welcome WhatsApp */}
        <section>
          <SectionHeader title="T+0 · Welcome WhatsApp" tag="Twilio · hormone_welcome_v1" />
          <PhoneMock
            contactName="Coach Kai"
            status="online"
            messages={[
              {
                text: (
                  <>
                    Hi Sarah, it's Kai 👋
                    <br /><br />
                    You're officially in for Cohort 1 (June 2–4).
                    <br /><br />
                    Over the next two weeks I'll be your guide before we go live with Dr. Saxena.
                    Short messages, never spam.
                    <br /><br />
                    Tap below to open your dashboard whenever you're ready.
                  </>
                ),
                button: 'Open my dashboard',
              },
              { footer: 'Reply STOP anytime to unsubscribe.' },
            ]}
          />
        </section>

        {/* T+24h WhatsApp nudge */}
        <section>
          <SectionHeader title="T+24h · WhatsApp nudge" tag="welcome_nudge_24h_v1 · skipped if signed in" />
          <PhoneMock
            contactName="Coach Kai"
            status="online"
            messages={[
              {
                text: (
                  <>
                    Hey Sarah — it's Kai again.
                    <br /><br />
                    Your dashboard is still waiting whenever you're ready. Quick tap and you're in:
                    <br /><br />
                    <span className="text-[#075E54] underline">shilpamethod.com/m/xyz...</span>
                    <br /><br />
                    (No rush — just don't want it to slip past you.)
                  </>
                ),
              },
            ]}
          />
        </section>

        {/* T+72h email nudge */}
        <section>
          <SectionHeader title="T+72h · Email nudge" tag="Resend · skipped if signed in" />
          <EmailMock
            from="Coach Kai"
            fromAddress="coachkai@shilpamethod.com"
            subject="Did our welcome email get lost?"
            preheader="A fresh magic link and a no-questions-asked refund offer — just in case."
            ctaLabel="Open my dashboard →"
            body={
              <>
                <p>Hi Sarah,</p>
                <p>
                  Three days ago you signed up for The Hormone Method — but you haven't opened your
                  dashboard yet, so I wanted to make sure the welcome email didn't end up in your
                  spam folder.
                </p>
                <p>Here's a fresh link:</p>
                <p className="text-[12px] text-slate mt-4">
                  If you've changed your mind and want a refund, just reply to this email — no
                  questions asked.
                </p>
                <p className="text-forest italic mt-3">— Coach Kai · coachkai@shilpamethod.com</p>
              </>
            }
          />
        </section>
      </div>

      <div className="mt-12 text-center">
        <Link
          to="/preview/welcome"
          className="font-mono text-[11px] text-slate hover:text-forest tracking-widest uppercase"
        >
          ← back to the welcome page
        </Link>
      </div>
    </PageShell>
  )
}

function SectionHeader({ title, tag }: { title: string; tag: string }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
      <h2 className="font-display text-[20px] text-forest">{title}</h2>
      <span className="font-mono text-[10px] text-slate tracking-widest uppercase">{tag}</span>
    </div>
  )
}

function EmailMock({
  from,
  fromAddress,
  subject,
  preheader,
  ctaLabel,
  body,
}: {
  from: string
  fromAddress: string
  subject: string
  preheader: string
  ctaLabel: string
  body: React.ReactNode
}) {
  return (
    <div className="bg-bone border border-border rounded-2xl overflow-hidden">
      {/* Mail client header */}
      <div className="bg-white px-5 py-3 border-b border-border">
        <div className="text-[12px] text-slate">
          <span className="font-medium text-forest">{from}</span>{' '}
          <span className="opacity-70">&lt;{fromAddress}&gt;</span>
        </div>
        <div className="text-[15px] text-forest mt-0.5 font-medium">{subject}</div>
        <div className="text-[11px] text-slate mt-0.5 italic">{preheader}</div>
      </div>
      {/* Email body */}
      <div className="p-6 text-[13px] text-slate leading-relaxed space-y-3">
        <div className="font-mono text-[10px] text-gold tracking-widest uppercase">
          The Hormone Method · Cohort 1
        </div>
        <div className="font-display text-[26px] text-forest leading-tight">You're in, Sarah.</div>
        {body}
        <div className="pt-2">
          <span className="inline-block bg-rust text-cream text-[14px] px-5 py-2.5 rounded-full">
            {ctaLabel}
          </span>
        </div>
      </div>
    </div>
  )
}

function PhoneMock({
  contactName,
  status,
  messages,
}: {
  contactName: string
  status: string
  messages: Array<{ text?: React.ReactNode; button?: string; footer?: string }>
}) {
  return (
    <div className="bg-forest rounded-[32px] p-2 max-w-[360px] mx-auto">
      <div className="bg-white rounded-[24px] overflow-hidden">
        {/* WA header */}
        <div className="bg-[#075E54] text-white px-4 py-3 text-[13px] flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-coral flex items-center justify-center font-display text-[14px]">
            K
          </div>
          <div>
            <div className="font-medium">{contactName}</div>
            <div className="text-[11px] text-white/70">{status}</div>
          </div>
        </div>
        {/* Message area */}
        <div className="bg-[#ECE5DD] p-4 space-y-2 min-h-[180px]">
          {messages.map((m, i) =>
            m.text ? (
              <div key={i}>
                <div className="bg-white rounded-xl px-3 py-2 text-[13px] text-ink max-w-[90%] shadow-sm leading-relaxed">
                  {m.text}
                </div>
                {m.button && (
                  <div className="bg-white rounded-xl mt-1 px-3 py-2 max-w-[90%] shadow-sm">
                    <div className="text-[13px] text-[#075E54] text-center font-medium">
                      {m.button} ↗
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div
                key={i}
                className="text-[10px] text-slate/70 text-center italic pt-2"
              >
                {m.footer}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  )
}
