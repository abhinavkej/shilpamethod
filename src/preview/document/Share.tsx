import { useState } from 'react'
import { PageShell, H1, Mono, PrimaryButton } from '../ui'

// §9.3 Doctor email generator — /document/share
const DEFAULT_SUBJECT = 'Pre-appointment document — Sarah Chen'
const DEFAULT_BODY = `Dear Dr. [Name],

Ahead of my appointment on [date], I've attached a document prepared during a 3-day educational program with Dr. Shilpa Saxena, MD (CMO of Forum Health, IFMCP-certified).

The document summarizes my symptoms, family history, risk profile, and questions I'd like to discuss. It includes PubMed citations for the underlying evidence.

I'm not bringing this to challenge your judgment — I'm bringing it so we can use our time together as efficiently as possible.

Looking forward to our conversation.

Best,
Sarah Chen`

export default function DocumentShare() {
  const [toEmail, setToEmail] = useState('')
  const [subject, setSubject] = useState(DEFAULT_SUBJECT)
  const [body, setBody] = useState(DEFAULT_BODY)
  const [copied, setCopied] = useState(false)

  const mailto = `mailto:${toEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

  const share = 'https://shilpamethod.com/d/share/abc123def456' // tokenized URL, 30-day expiry

  const copyLink = () => {
    navigator.clipboard.writeText(share)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <PageShell maxWidth="max-w-2xl">
      <Mono className="block mb-2">Share</Mono>
      <H1>Send this to your doctor before your appointment.</H1>

      <div className="space-y-5 mb-8">
        <label className="block">
          <div className="font-mono text-[10px] text-slate tracking-widest uppercase mb-2">Doctor's email</div>
          <input
            type="email"
            value={toEmail}
            onChange={(e) => setToEmail(e.target.value)}
            placeholder="doctor@clinic.com"
            className="w-full bg-white border border-border rounded-xl px-4 py-3 text-[16px] focus:border-forest focus:outline-none"
          />
        </label>
        <label className="block">
          <div className="font-mono text-[10px] text-slate tracking-widest uppercase mb-2">Subject</div>
          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full bg-white border border-border rounded-xl px-4 py-3 text-[15px] focus:border-forest focus:outline-none"
          />
        </label>
        <label className="block">
          <div className="font-mono text-[10px] text-slate tracking-widest uppercase mb-2">Body (editable)</div>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={14}
            className="w-full bg-white border border-border rounded-xl px-4 py-3 text-[14px] leading-relaxed focus:border-forest focus:outline-none font-sans"
          />
        </label>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-10">
        <PrimaryButton onClick={() => (window.location.href = mailto)}>Open in email client →</PrimaryButton>
        <button
          onClick={copyLink}
          className="border border-forest text-forest text-[15px] px-5 py-2.5 rounded-full hover:bg-forest hover:text-cream transition-colors"
        >
          {copied ? 'Copied!' : 'Copy view-only link →'}
        </button>
      </div>

      <div className="bg-sand/60 border border-border rounded-xl p-5">
        <Mono className="block mb-2 text-coral">Tokenized share link</Mono>
        <div className="font-mono text-[12px] text-forest break-all">{share}</div>
        <div className="text-[12px] text-slate mt-2">
          View-only. No auth required. Valid for 30 days. Read-only, read-once reporting to you when accessed.
        </div>
      </div>
    </PageShell>
  )
}
