import { Link, useSearchParams } from 'react-router-dom'
import { PageShell, Mono } from '../ui'

// §9 — /document viewer. ?state=locked simulates pre-generation.
export default function DocumentViewer() {
  const [params] = useSearchParams()
  const locked = params.get('state') === 'locked'

  if (locked) {
    return (
      <PageShell maxWidth="max-w-xl">
        <div className="bg-white border border-border rounded-2xl p-10 text-center">
          <div className="text-[56px] mb-4 opacity-30">🔒</div>
          <h1 className="font-display text-[28px] text-forest mb-3">
            Your Patient Advocacy Document will be generated after Day 3.
          </h1>
          <Mono className="block mt-4">Expected: June 4, 2026 · 9:30 PM ET</Mono>
        </div>
      </PageShell>
    )
  }

  return (
    <main className="max-w-4xl mx-auto px-6 pb-20 pt-8">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
        <div>
          <Mono className="block mb-2">Generated June 5, 2026 · v1</Mono>
          <h1 className="font-display text-display-md text-forest">Your Hormone Story.</h1>
        </div>
        <div className="flex gap-3">
          <button className="bg-coral text-cream px-5 py-2.5 rounded-full text-[14px] hover:bg-rust">
            Download PDF →
          </button>
          <Link
            to="/preview/document/share"
            className="border border-forest text-forest px-5 py-2.5 rounded-full text-[14px] hover:bg-forest hover:text-cream transition-colors"
          >
            Share with your doctor →
          </Link>
        </div>
      </div>

      {/* Inline PDF preview — mock */}
      <div className="bg-bone border border-border rounded-2xl overflow-hidden shadow-sm">
        {[
          { n: 1, title: 'Cover', body: 'Patient Advocacy Document · Prepared for Sarah Chen · The Shilpa Method · Cohort 1 · June 2–4, 2026' },
          { n: 2, title: 'How to Use This Document', body: 'This is for your doctor. Bring it to your appointment. The PubMed citations let your doctor verify the underlying evidence. They don\'t have to agree with everything — this is a conversation starter.' },
          { n: 3, title: 'Your Symptom Profile', body: 'Table: each symptom rated with severity, duration, clinical relevance. Footer cohort context: "Symptoms reported across 47 women in this cohort: top 5 with %."' },
          { n: 4, title: 'Risk Stratification', body: 'Four axes — Clotting · Cancer · Cardiovascular · Bone — each with green/yellow/red status, specific data points from intake, 1-2 PubMed citations per axis.' },
          { n: 5, title: 'Recommended Labs', body: 'Fasting insulin · HbA1c · Free & Total testosterone · SHBG · Estradiol · Progesterone · TSH · Free T3/T4 · DHEA-S · 25-OH Vit D · Lipid panel · hs-CRP. Conditional adds based on risk flags.' },
          { n: 6, title: 'Discussion Points for Your Doctor', body: '5–7 specific questions derived from intake + workbook: "Given my family history of X, what\'s your view on starting BHRT?" "I\'ve been experiencing Y for Z months — is there a specific lab that would clarify the cause?"' },
          { n: 7, title: 'Lifestyle Foundations', body: 'Sleep, exercise, nutrition, stress targets specific to perimenopause / menopause. Pulled from Dr. Saxena\'s framework.' },
          { n: 8, title: 'References & Methodology', body: 'Numbered PubMed IDs for every citation. About Dr. Saxena (2 paragraphs). About this document — methodology, limitations, disclaimer.' },
        ].map((p) => (
          <div key={p.n} className="px-8 py-6 border-b border-border/60 last:border-0">
            <div className="flex items-baseline gap-3 mb-2">
              <span className="font-mono text-[10px] text-coral tracking-widest uppercase">Page {p.n}</span>
              <h2 className="font-display text-[20px] text-forest">{p.title}</h2>
            </div>
            <p className="text-body-sm text-slate leading-relaxed">{p.body}</p>
          </div>
        ))}
      </div>

      <p className="text-[13px] text-slate italic mt-8 max-w-[560px]">
        This document was generated based on your intake and workbooks. If anything has changed, you
        can <button className="text-coral underline underline-offset-4">request an updated version</button> — v2 will
        be ready within an hour.
      </p>
    </main>
  )
}
