import { Link, useSearchParams } from 'react-router-dom'
import { PageShell, Mono } from '../ui'

const DOC_SECTIONS = [
  {
    title: 'Cover',
    content: null,
  },
  {
    title: 'How to Use This Document',
    content: [
      'Bring this to your appointment. Show it before the physical exam — not after.',
      "The PubMed citations let your doctor verify the underlying evidence. They don't have to agree with everything — this is a conversation starter, not a prescription.",
      'If your doctor dismisses a specific concern, point to the relevant citation and ask: "Is there something in my case that makes this evidence not apply to me?"',
      "The Discussion Points section (page 6) contains exact questions to ask. You can read them aloud if that's easier.",
    ],
  },
  {
    title: 'Your Symptom Profile',
    content: null,
    table: {
      headers: ['Symptom', 'Severity (1–10)', 'Duration', 'Clinical Relevance'],
      rows: [
        ['Night sweats / hot flashes', '7', '14 months', 'High — vasomotor symptoms, estrogen variability'],
        ['Sleep disruption (3–4 AM waking)', '8', '18 months', 'High — cortisol/estrogen interaction, linked to fatigue'],
        ['Brain fog / word-finding', '6', '12 months', 'Moderate — estrogen affects verbal memory and recall'],
        ['Mood swings / irritability', '7', '14 months', 'High — progesterone decline, GABA receptor sensitivity'],
        ['Fatigue (unresponsive to sleep)', '6', '12 months', 'Moderate — often thyroid or adrenal adjacent; check cortisol'],
        ['Libido decline', '5', '10 months', 'Moderate — low free testosterone; often under-tested in women'],
        ['Joint pain / stiffness', '4', '8 months', 'Low-moderate — estrogen has anti-inflammatory role'],
      ],
    },
    footer: 'Symptom pattern consistent with perimenopause / early estrogen insufficiency. No single symptom is diagnostic; the cluster is.',
  },
  {
    title: 'Risk Stratification',
    content: null,
    risks: [
      { axis: 'Clotting (VTE)', status: 'green', note: 'No personal or family history of DVT/PE. No smoking. BMI 24. Low risk for transdermal estrogen.', citation: 'PMID 28236721' },
      { axis: 'Cancer (Breast/Uterine)', status: 'yellow', note: 'No personal history. Maternal aunt with breast cancer at 62 — post-menopausal, hormone-receptor positive. Recommend discussing with oncology if HRT is started. BRCA not tested.', citation: 'PMID 30100485' },
      { axis: 'Cardiovascular', status: 'green', note: 'BP 118/74. Lipid panel: LDL 112, HDL 58, TG 89. Fasting glucose 92. Low-moderate risk. Estrogen started before age 60 / within 10 years of menopause is cardioprotective.', citation: 'PMID 26461519' },
      { axis: 'Bone Density', status: 'yellow', note: 'DEXA not done. Risk factors: Caucasian, lean, low Vitamin D (27 ng/mL). Recommend DEXA at next annual. Estrogen is protective; delay increases risk.', citation: 'PMID 23762545' },
    ],
  },
  {
    title: 'Recommended Labs',
    content: null,
    labs: [
      { name: 'Estradiol (E2)', note: 'Serum, day 2–3 of cycle if still cycling. If no cycle, any day.' },
      { name: 'FSH', note: 'Rises in perimenopause. >10 is early signal; >25 significant.' },
      { name: 'Free & Total Testosterone', note: 'Often low — drives fatigue, libido, muscle loss.' },
      { name: 'SHBG', note: 'High SHBG lowers free hormone availability even when total is "normal."' },
      { name: 'Progesterone', note: 'Day 21 if cycling. Evaluates luteal phase adequacy.' },
      { name: 'TSH + Free T3/T4', note: 'Thyroid dysfunction mimics perimenopause. Rule out first.' },
      { name: 'Fasting Insulin + HbA1c', note: 'Metabolic health affects estrogen metabolism and symptom severity.' },
      { name: '25-OH Vitamin D', note: 'Target 50–80 ng/mL. Low D amplifies every hormonal symptom.' },
      { name: 'DHEA-S', note: 'Adrenal androgen precursor. Low levels contribute to fatigue.' },
      { name: 'Lipid panel + hs-CRP', note: 'Cardiovascular baseline before starting any hormone therapy.' },
    ],
  },
  {
    title: 'Discussion Points for Your Doctor',
    content: [
      '"Given my cluster of vasomotor, sleep, and mood symptoms over 14+ months, would you consider this consistent with perimenopause?"',
      `"My estradiol and FSH haven't been tested yet — can we order them today, along with free testosterone and SHBG?"`,
      `"I have a maternal family history of breast cancer at 62 — what's your view on transdermal estrogen given that history?"`,
      `"I've read that bioidentical transdermal estrogen carries lower clotting risk than oral synthetic estrogen (PMID 28236721). Is that relevant to my case?"`,
      '"If labs confirm estrogen insufficiency, what would your treatment protocol look like, and what monitoring would we do?"',
      `"What's the threshold at which you'd recommend starting hormone therapy versus watchful waiting?"`,
      '"Can we schedule a follow-up in 6–8 weeks after labs come back to review together?"',
    ],
  },
  {
    title: 'Lifestyle Foundations',
    content: null,
    lifestyle: [
      { area: 'Sleep', rec: 'Prioritize 7–8 hours. Magnesium glycinate 400mg before bed can reduce 3AM waking. Avoid alcohol within 3 hours of sleep — disrupts sleep architecture and worsens hot flashes.' },
      { area: 'Exercise', rec: 'Resistance training 2–3x/week preserves muscle mass and bone density (both decline with estrogen drop). Zone 2 cardio 3x/week supports insulin sensitivity and mood.' },
      { area: 'Nutrition', rec: 'Protein target: 1.2–1.6g/kg bodyweight. Prioritize fiber (30g/day) for estrogen metabolism via gut. Reduce ultra-processed foods and refined carbs — worsens insulin variability.' },
      { area: 'Stress / Cortisol', rec: 'Chronic elevated cortisol competes with progesterone receptor sites. Morning sunlight (10+ min), breathwork (4-7-8), and limiting evening screens all help regulate the cortisol curve.' },
      { area: 'Alcohol', rec: 'Even 1 drink/day meaningfully raises breast cancer risk and worsens vasomotor symptoms. If you choose to drink, red wine with dinner is lowest risk.' },
    ],
  },
  {
    title: 'References & Methodology',
    content: [
      'PMID 28236721 — Canonico M et al. Hormone therapy and venous thromboembolism among postmenopausal women. Circulation, 2007.',
      'PMID 30100485 — Collaborative Group on Hormonal Factors in Breast Cancer. Type and timing of menopausal hormone therapy. Lancet, 2019.',
      'PMID 26461519 — Schierbeck LL et al. Effect of hormone replacement therapy on cardiovascular events. BMJ, 2012.',
      'PMID 23762545 — Eastell R et al. Postmenopausal osteoporosis. Nat Rev Dis Primers, 2016.',
      '',
      'About Dr. Shilpa Saxena: Dr. Saxena is a board-certified family physician and functional medicine practitioner with 20+ years focused on women\'s hormonal health. She trained at Forum Health and is the co-developer of The Hormone Method curriculum.',
      '',
      'Methodology: This document was generated from intake responses, workbook entries, and session participation. It is educational guidance, not medical advice, and does not establish a physician-patient relationship. All citations are PubMed-indexed. Clinical decisions remain at the discretion of your licensed provider.',
    ],
  },
]

export default function DocumentViewer() {
  const [params] = useSearchParams()
  const locked = params.get('state') === 'locked'

  const handlePrint = () => {
    window.print()
  }

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
    <>
      {/* Print-only styles */}
      <style>{`
        @media print {
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; color-adjust: exact !important; }
          .no-print { display: none !important; }
          body { background: white !important; }
          .print-doc { max-width: 100% !important; padding: 0 !important; }
          .print-section { page-break-inside: avoid; }
          .print-cover { background-color: #1F3A2E !important; color: #F8F3E8 !important; }
          .print-sand { background-color: #EFE7D4 !important; }
        }
      `}</style>

      <main className="max-w-4xl mx-auto px-6 pb-20 pt-8 print-doc">
        {/* Header — hidden on print */}
        <div className="no-print flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <Mono className="block mb-2">Generated June 5, 2026 · v1 · Sarah Chen</Mono>
            <h1 className="font-display text-display-md text-forest">Your Patient Advocacy Document.</h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handlePrint}
              className="bg-coral text-cream px-5 py-2.5 rounded-full text-[14px] hover:bg-rust transition-colors"
            >
              Download PDF →
            </button>
            <Link
              to="/preview/document/share"
              className="border border-forest text-forest px-5 py-2.5 rounded-full text-[14px] hover:bg-forest hover:text-cream transition-colors"
            >
              Send to my doctor →
            </Link>
          </div>
        </div>

        {/* Print-only header */}
        <div className="hidden print:block mb-8">
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '32px', color: '#1F3A2E' }}>Patient Advocacy Document</h1>
          <p style={{ fontSize: '13px', color: '#6B6358' }}>Prepared for Sarah Chen · The Hormone Method by Forum Health · Cohort 1 · June 2–4, 2026</p>
          <p style={{ fontSize: '13px', color: '#6B6358' }}>Generated June 5, 2026 · v1 · shilpamethod.com</p>
        </div>

        {/* Document sections */}
        <div className="space-y-0 border border-border rounded-2xl overflow-hidden">
          {/* Cover */}
          <div className="bg-forest text-cream px-8 py-8 print-section print-cover" style={{ backgroundColor: '#1F3A2E', color: '#F8F3E8' }}>
            <div className="font-mono text-[10px] text-coral-soft tracking-widest uppercase mb-3">Patient Advocacy Document</div>
            <h2 className="font-display text-[36px] text-cream leading-tight mb-2">Your Hormone Story.</h2>
            <p className="text-[14px] text-cream/70">Prepared for Sarah Chen</p>
            <p className="text-[13px] text-cream/50 mt-1">The Hormone Method by Forum Health · Cohort 1 · June 2–4, 2026 · Generated June 5, 2026</p>
            <p className="text-[13px] text-cream/50 mt-3 leading-relaxed max-w-[520px]">
              This document summarizes your symptoms, risk profile, and clinical history in language your doctor can act on.
              Bring it to your next appointment.
            </p>
          </div>

          {/* How to use */}
          <div className="bg-white px-8 py-6 border-t border-border/60 print-section">
            <div className="font-mono text-[10px] text-coral tracking-widest uppercase mb-3">How to use this document</div>
            <ul className="space-y-2">
              {DOC_SECTIONS[1].content!.map((line, i) => (
                <li key={i} className="flex gap-3 text-[14px] text-slate leading-relaxed">
                  <span className="text-coral mt-0.5 flex-none">→</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Symptom profile */}
          <div className="bg-sand/20 px-8 py-6 border-t border-border/60 print-section print-sand overflow-x-auto">
            <div className="font-mono text-[10px] text-coral tracking-widest uppercase mb-3">Your Symptom Profile</div>
            <table className="w-full text-[13px] min-w-[500px]">
              <thead>
                <tr className="border-b border-border">
                  {DOC_SECTIONS[2].table!.headers.map((h) => (
                    <th key={h} className="text-left py-2 pr-4 font-mono text-[10px] text-slate tracking-widest uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {DOC_SECTIONS[2].table!.rows.map((row, i) => (
                  <tr key={i} className="border-b border-border/40 last:border-0">
                    {row.map((cell, j) => (
                      <td key={j} className={`py-2.5 pr-4 align-top leading-relaxed ${j === 0 ? 'text-forest font-medium' : 'text-slate'}`}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-[12px] text-slate italic mt-4">{DOC_SECTIONS[2].footer}</p>
          </div>

          {/* Risk stratification */}
          <div className="bg-white px-8 py-6 border-t border-border/60 print-section">
            <div className="font-mono text-[10px] text-coral tracking-widest uppercase mb-3">Risk Stratification</div>
            <div className="space-y-4">
              {DOC_SECTIONS[3].risks!.map((r) => (
                <div key={r.axis} className="flex gap-4 items-start">
                  <div className={`w-3 h-3 rounded-full mt-1 flex-none ${r.status === 'green' ? 'bg-sage' : 'bg-amber-400'}`} />
                  <div>
                    <div className="text-[14px] font-medium text-forest">{r.axis}</div>
                    <p className="text-[13px] text-slate leading-relaxed">{r.note}</p>
                    <span className="font-mono text-[10px] text-slate/50">{r.citation}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended labs */}
          <div className="bg-sand/20 px-8 py-6 border-t border-border/60 print-section print-sand">
            <div className="font-mono text-[10px] text-coral tracking-widest uppercase mb-3">Recommended Labs</div>
            <div className="grid sm:grid-cols-2 gap-3">
              {DOC_SECTIONS[4].labs!.map((lab) => (
                <div key={lab.name} className="bg-white border border-border/60 rounded-xl px-4 py-3">
                  <div className="text-[13px] font-medium text-forest">{lab.name}</div>
                  <div className="text-[12px] text-slate mt-0.5">{lab.note}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Discussion points */}
          <div className="bg-white px-8 py-6 border-t border-border/60 print-section">
            <div className="font-mono text-[10px] text-coral tracking-widest uppercase mb-3">Discussion Points for Your Doctor</div>
            <p className="text-[13px] text-slate mb-4">Read these aloud at your appointment, or hand the doctor this page.</p>
            <ol className="space-y-3">
              {DOC_SECTIONS[5].content!.map((q, i) => (
                <li key={i} className="flex gap-3 text-[13px] text-slate leading-relaxed">
                  <span className="text-coral font-medium flex-none">{i + 1}.</span>
                  <span className="italic">{q}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Lifestyle */}
          <div className="bg-sand/20 px-8 py-6 border-t border-border/60 print-section print-sand">
            <div className="font-mono text-[10px] text-coral tracking-widest uppercase mb-3">Lifestyle Foundations</div>
            <div className="space-y-4">
              {DOC_SECTIONS[6].lifestyle!.map((item) => (
                <div key={item.area}>
                  <div className="text-[14px] font-medium text-forest">{item.area}</div>
                  <p className="text-[13px] text-slate leading-relaxed mt-1">{item.rec}</p>
                </div>
              ))}
            </div>
          </div>

          {/* References */}
          <div className="bg-white px-8 py-6 border-t border-border/60 print-section">
            <div className="font-mono text-[10px] text-coral tracking-widest uppercase mb-3">References & Methodology</div>
            <div className="space-y-2">
              {DOC_SECTIONS[7].content!.map((line, i) => (
                line ? (
                  <p key={i} className="text-[12px] text-slate leading-relaxed">{line}</p>
                ) : (
                  <div key={i} className="h-2" />
                )
              ))}
            </div>
          </div>
        </div>

        <p className="text-[13px] text-slate italic mt-6 max-w-[560px] no-print">
          Something changed? You can{' '}
          <button className="text-coral underline underline-offset-4">request an updated version</button>{' '}
          after new labs come in — v2 generates within an hour.
        </p>
      </main>
    </>
  )
}
