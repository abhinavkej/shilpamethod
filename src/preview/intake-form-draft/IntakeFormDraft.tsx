import { Link } from 'react-router-dom'

// A comprehensive first-draft intake form mapped against Dr. Saxena's
// Define Needs → Calculate Risks → Create Solutions framework.
// Designed to be reviewed by Shilpa, edited, and then shipped as the live intake.
// This is the print/PDF version — the actual clickable preview lives at /preview/intake.

const SECTIONS = [
  {
    id: 'A',
    title: 'About You',
    intent: 'Baseline demographics. Feeds every other section.',
    fields: [
      { q: 'Preferred name', type: 'text' },
      { q: 'Date of birth', type: 'date' },
      { q: 'Height', type: 'text' },
      { q: 'Weight', type: 'text' },
      { q: 'Ethnicity / ancestry (relevant to bone density, clotting risk, metabolic patterns)', type: 'text' },
      { q: 'Country of residence + closest major city', type: 'text' },
      { q: 'Time zone you prefer for sessions', type: 'text' },
      { q: "Do you currently have a primary care doctor you trust?", type: 'single', options: ['Yes', 'Sort of', 'No'] },
      { q: "Do you currently have an OB-GYN you trust?", type: 'single', options: ['Yes', 'Sort of', 'No'] },
    ],
  },
  {
    id: 'B',
    title: 'Cycle & Reproductive History',
    intent: 'Stages perimenopause, tracks reproductive signal history.',
    fields: [
      {
        q: 'Where are you in your cycle right now?',
        type: 'single',
        options: [
          'Regular periods (roughly predictable)',
          'Irregular (skipping, length changing)',
          'Stopped less than 12 months ago',
          'Stopped 12 months or more ago',
          'Never had regular cycles / on hormonal suppression',
          'Not sure',
        ],
      },
      { q: 'Date of your last menstrual period (approximate is fine)', type: 'text' },
      { q: 'Age your cycle first started becoming irregular', type: 'text' },
      { q: 'Number of pregnancies', type: 'text' },
      { q: 'Number of live births', type: 'text' },
      { q: 'Number of miscarriages', type: 'text' },
      { q: 'Any fertility treatments (IVF, IUI, Clomid, etc.)?', type: 'text' },
      { q: 'Hysterectomy?', type: 'single', options: ['No', 'Partial (uterus only)', 'Total (uterus + ovaries)'] },
      { q: 'Contraceptive history (current and past — pills, IUD, implant, none)', type: 'text' },
    ],
  },
  {
    id: 'C',
    title: 'Symptom Profile — Define Needs',
    intent: 'This is what maps to Day 1. Rate by impact on daily life over the last 3 months.',
    fields: [
      {
        q: 'Rate each symptom 0 (none) → 4 (debilitating)',
        type: 'matrix',
        options: [
          'Sleep disruption (trouble falling, trouble staying, or 3 AM wake-ups)',
          'Hot flashes / night sweats',
          'Brain fog / memory / word-finding',
          'Mood changes / irritability / new anxiety',
          'Fatigue that sleep doesn\'t fix',
          'Weight changes (especially midsection)',
          'Joint pain / frozen shoulder / stiffness',
          'Hair thinning',
          'Skin changes (dryness, acne, elasticity)',
          'Low libido / sexual function changes',
          'Vaginal dryness / painful intercourse',
          'Bladder urgency / incontinence',
          'Headaches / migraines',
          'Heart palpitations',
          'Digestion changes (bloating, constipation)',
        ],
      },
      { q: 'Which ONE symptom would you most want resolved?', type: 'text' },
      { q: 'When did you first notice something was "off"?', type: 'text' },
      { q: 'Walk us through what a bad day looks like, specifically.', type: 'longtext' },
      {
        q: 'Have you talked to a doctor about these symptoms?',
        type: 'single',
        options: [
          'Yes, they were helpful',
          'Yes, they dismissed it',
          "Yes, but I didn't push",
          'No, planning to',
          'No, not yet',
        ],
      },
    ],
  },
  {
    id: 'D',
    title: 'Family History — Calculate Risks',
    intent: 'Feeds the four risk axes (clotting, cancer, cardiovascular, bone). 1st-degree relatives unless noted.',
    fields: [
      { q: 'Mother: age, health status, cause of death if applicable', type: 'text' },
      { q: 'Father: age, health status, cause of death if applicable', type: 'text' },
      { q: 'Siblings: ages + any relevant conditions', type: 'text' },
      { q: 'DVT, PE, or stroke before age 60 (anyone in family)', type: 'single', options: ['Yes', 'No', "Don't know"] },
      { q: 'Breast cancer (family)', type: 'single', options: ['Yes', 'No', "Don't know"] },
      { q: 'Ovarian or uterine cancer (family)', type: 'single', options: ['Yes', 'No', "Don't know"] },
      { q: 'Heart attack before age 60 (family)', type: 'single', options: ['Yes', 'No', "Don't know"] },
      { q: 'Osteoporosis or hip fracture (family)', type: 'single', options: ['Yes', 'No', "Don't know"] },
      { q: "Dementia or Alzheimer's (family)", type: 'single', options: ['Yes', 'No', "Don't know"] },
      { q: 'Type 2 diabetes (family)', type: 'single', options: ['Yes', 'No', "Don't know"] },
      { q: 'Known genetic conditions (BRCA1/2, Factor V Leiden, APOE4, Lynch, etc.)', type: 'text' },
    ],
  },
  {
    id: 'E',
    title: 'Personal Medical History — Calculate Risks',
    intent: 'Direct history — these change HRT candidacy and lab priorities.',
    fields: [
      { q: 'Any blood clot, DVT, or PE (ever)?', type: 'single', options: ['Yes', 'No'] },
      { q: 'Any cancer (ever)?', type: 'text' },
      { q: 'Autoimmune conditions (Hashimoto, Lupus, RA, etc.)?', type: 'text' },
      { q: 'Thyroid condition (current or past)?', type: 'text' },
      { q: 'Type 1 or type 2 diabetes?', type: 'single', options: ['Yes', 'Prediabetes', 'No'] },
      { q: 'Cardiovascular conditions (BP, cholesterol, arrhythmia, CAD)?', type: 'text' },
      { q: 'Current medications (name + dose + how long)', type: 'longtext' },
      { q: 'Current supplements (name + dose + how long)', type: 'longtext' },
      { q: 'Known allergies (medication + environmental)', type: 'text' },
      { q: 'Surgeries (type + year)', type: 'text' },
      { q: 'Last DEXA / bone density scan (when + result)', type: 'text' },
      { q: 'Last mammogram (when + result)', type: 'text' },
    ],
  },
  {
    id: 'F',
    title: 'Existing Labs',
    intent: 'So Dr. Saxena can work from what you already have. Upload or list values + dates.',
    fields: [
      { q: 'Most recent CBC + metabolic panel (date + anything flagged)', type: 'longtext' },
      { q: 'Hormone panel — Estradiol, FSH, LH, Progesterone (date + values)', type: 'longtext' },
      { q: 'Testosterone panel — Free, Total, SHBG (date + values)', type: 'longtext' },
      { q: 'Thyroid panel — TSH, Free T3, Free T4, antibodies (date + values)', type: 'longtext' },
      { q: 'Fasting insulin + HbA1c (date + values)', type: 'longtext' },
      { q: '25-OH Vitamin D (date + value)', type: 'longtext' },
      { q: 'Lipid panel + hs-CRP (date + values)', type: 'longtext' },
      { q: 'Anything else you\'ve tested (ApoB, Lp(a), DHEA-S, cortisol, etc.)', type: 'longtext' },
    ],
  },
  {
    id: 'G',
    title: 'Lifestyle Baseline',
    intent: 'Anchors the lifestyle section of your document. Honest > optimistic.',
    fields: [
      {
        q: 'Sleep — average hours per night',
        type: 'single',
        options: ['< 5', '5–6', '6–7', '7–8', '8+'],
      },
      {
        q: 'Sleep quality',
        type: 'single',
        options: ['Poor', 'Fair', 'Good', 'Excellent'],
      },
      {
        q: 'Exercise — strength training frequency',
        type: 'single',
        options: ['Never', '1× per week', '2× per week', '3+ per week'],
      },
      {
        q: 'Exercise — cardio frequency (any kind)',
        type: 'single',
        options: ['Never', '1× per week', '2–3× per week', '4+ per week'],
      },
      { q: 'Describe your typical day of eating', type: 'longtext' },
      {
        q: 'Alcohol — drinks per week (honest)',
        type: 'single',
        options: ['0', '1–3', '4–7', '8–14', '15+'],
      },
      {
        q: 'Caffeine — cups per day',
        type: 'single',
        options: ['0', '1', '2', '3', '4+'],
      },
      { q: 'Tobacco / vape use', type: 'single', options: ['Never', 'Past', 'Current'] },
      {
        q: 'Stress level, last 3 months',
        type: 'single',
        options: ['Low', 'Moderate', 'High', 'Chronic / debilitating'],
      },
      { q: 'What\'s your primary stress source right now?', type: 'text' },
      { q: 'Do you have an active stress-management practice (meditation, breathwork, therapy)?', type: 'text' },
    ],
  },
  {
    id: 'H',
    title: 'Goals & Stance — Create Solutions',
    intent: 'This maps to Day 3. What you want to walk away with.',
    fields: [
      { q: 'What do you most want to walk away with from this boot camp?', type: 'longtext' },
      { q: 'What\'s the conversation with your doctor you wish you could have?', type: 'longtext' },
      {
        q: 'Where do you currently land on hormonal therapy?',
        type: 'single',
        options: [
          'Ready and open — just want to know which form is right for me',
          'Curious, but nervous',
          'Strongly prefer lifestyle-first, then reassess',
          'Opposed to hormones for personal / medical reasons',
          'I have no idea and want to be guided',
        ],
      },
      {
        q: 'What\'s your biggest fear about hormonal therapy?',
        type: 'longtext',
      },
      {
        q: 'Rank these in order of importance to you (1 = most important)',
        type: 'rank',
        options: [
          'Sleep',
          'Energy',
          'Mood',
          'Weight / body composition',
          'Sexual health / libido',
          'Long-term disease prevention (heart, bone, brain)',
          'Cognitive sharpness',
        ],
      },
      { q: 'What have you already tried that didn\'t work? What did work?', type: 'longtext' },
      { q: 'Anything else you want Dr. Saxena to know before Day 1?', type: 'longtext' },
    ],
  },
]

export default function IntakeFormDraft() {
  const handlePrint = () => window.print()

  return (
    <>
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

      <main className="max-w-3xl mx-auto px-6 pb-20 pt-8 print-doc">
        {/* Header — hidden on print */}
        <div className="no-print flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <div className="font-mono text-[10px] text-coral tracking-widest uppercase mb-2">
              Draft · For Dr. Saxena's review
            </div>
            <h1 className="font-display text-display-md text-forest">Intake Form — v1 Draft.</h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handlePrint}
              className="bg-coral text-cream px-5 py-2.5 rounded-full text-[14px] hover:bg-rust transition-colors"
            >
              Download PDF →
            </button>
            <Link
              to="/preview"
              className="border border-forest text-forest px-5 py-2.5 rounded-full text-[14px] hover:bg-forest hover:text-cream transition-colors"
            >
              ← Back
            </Link>
          </div>
        </div>

        <p className="no-print text-body-sm text-slate mb-8 leading-relaxed">
          First-draft intake form mapped to Dr. Saxena's <strong className="text-forest">Define Needs → Calculate Risks → Create Solutions</strong> framework. Every field maps to a section of the Patient Advocacy Document. Edit in red, share back, we'll ship v2.
        </p>

        {/* Document content */}
        <div className="border border-border rounded-2xl overflow-hidden">
          {/* Cover */}
          <div
            className="px-8 py-8 print-section print-cover"
            style={{ backgroundColor: '#1F3A2E', color: '#F8F3E8' }}
          >
            <div className="font-mono text-[10px] tracking-widest uppercase mb-3" style={{ color: '#F4D7C8' }}>
              The Hormone Method · by Dr. Shilpa Saxena
            </div>
            <h2 className="font-display text-[32px] leading-tight mb-2">Member Intake — v1 Draft.</h2>
            <p className="text-[14px] mt-2" style={{ color: 'rgba(248,243,232,0.75)' }}>
              Prepared for review by Dr. Shilpa Saxena, MD
            </p>
            <p className="text-[13px] mt-4 leading-relaxed max-w-[520px]" style={{ color: 'rgba(248,243,232,0.65)' }}>
              This intake feeds directly into the Patient Advocacy Document generated at the end of the boot camp. Each section maps to one day of the live program: Define Needs (Day 1), Calculate Risks (Day 2), Create Solutions (Day 3).
            </p>
          </div>

          {/* How this maps */}
          <div className="bg-white px-8 py-6 border-t border-border/60 print-section">
            <div className="font-mono text-[10px] text-coral tracking-widest uppercase mb-3">
              How each section maps
            </div>
            <div className="grid sm:grid-cols-3 gap-3">
              <MapCard day="Day 1" title="Define Needs" sections="Sections A · B · C" />
              <MapCard day="Day 2" title="Calculate Risks" sections="Sections D · E · F" />
              <MapCard day="Day 3" title="Create Solutions" sections="Sections G · H" />
            </div>
          </div>

          {/* Sections */}
          {SECTIONS.map((section, idx) => (
            <div
              key={section.id}
              className={`px-8 py-7 border-t border-border/60 print-section ${idx % 2 === 0 ? 'bg-sand/20 print-sand' : 'bg-white'}`}
            >
              <div className="flex items-baseline gap-3 mb-1">
                <span className="font-display text-[34px] text-coral/60 leading-none">{section.id}</span>
                <h3 className="font-display text-[24px] text-forest">{section.title}</h3>
              </div>
              <p className="text-[13px] text-slate italic mb-6 ml-[38px]">{section.intent}</p>

              <ol className="space-y-4 ml-[38px]">
                {section.fields.map((f, i) => (
                  <li key={i} className="text-[14px]">
                    <div className="flex gap-2 mb-1.5">
                      <span className="font-mono text-[11px] text-slate/60 pt-0.5">{i + 1}.</span>
                      <span className="text-forest font-medium">{f.q}</span>
                    </div>
                    <div className="ml-6">{renderInput(f as Field)}</div>
                  </li>
                ))}
              </ol>
            </div>
          ))}

          {/* Footer */}
          <div className="bg-white px-8 py-6 border-t border-border/60 print-section">
            <div className="font-mono text-[10px] text-coral tracking-widest uppercase mb-2">Dr. Saxena's review</div>
            <div className="grid sm:grid-cols-2 gap-4 text-[13px] text-slate">
              <div>
                <strong className="text-forest block mb-1">Questions to add:</strong>
                <div className="border-b border-border pb-1 min-h-[60px]" />
              </div>
              <div>
                <strong className="text-forest block mb-1">Questions to cut:</strong>
                <div className="border-b border-border pb-1 min-h-[60px]" />
              </div>
              <div>
                <strong className="text-forest block mb-1">Wording changes:</strong>
                <div className="border-b border-border pb-1 min-h-[60px]" />
              </div>
              <div>
                <strong className="text-forest block mb-1">Additional labs to request:</strong>
                <div className="border-b border-border pb-1 min-h-[60px]" />
              </div>
            </div>
            <p className="text-[11px] text-slate italic mt-6">
              Once Shilpa's edits are incorporated, this ships as the live intake at /intake and auto-populates the Patient Advocacy Document generated after Day 3.
            </p>
          </div>
        </div>
      </main>
    </>
  )
}

function MapCard({ day, title, sections }: { day: string; title: string; sections: string }) {
  return (
    <div className="border border-border rounded-xl px-4 py-3">
      <div className="font-mono text-[10px] text-coral tracking-widest uppercase mb-1">{day}</div>
      <div className="text-[14px] font-medium text-forest">{title}</div>
      <div className="text-[11px] text-slate mt-1">{sections}</div>
    </div>
  )
}

interface FieldBase {
  q: string
}
interface TextField extends FieldBase {
  type: 'text' | 'date' | 'longtext'
}
interface SingleField extends FieldBase {
  type: 'single'
  options: string[]
}
interface MatrixField extends FieldBase {
  type: 'matrix'
  options: string[]
}
interface RankField extends FieldBase {
  type: 'rank'
  options: string[]
}

type Field = TextField | SingleField | MatrixField | RankField

function renderInput(field: Field) {
  if (field.type === 'text' || field.type === 'date') {
    return <div className="border-b border-border/80 h-6" />
  }
  if (field.type === 'longtext') {
    return (
      <div className="space-y-1">
        <div className="border-b border-border/80 h-6" />
        <div className="border-b border-border/80 h-6" />
        <div className="border-b border-border/80 h-6" />
      </div>
    )
  }
  if (field.type === 'single') {
    return (
      <div className="flex flex-wrap gap-2">
        {field.options.map((opt) => (
          <span
            key={opt}
            className="text-[12px] bg-white border border-border rounded-full px-3 py-1 text-slate"
          >
            ○ {opt}
          </span>
        ))}
      </div>
    )
  }
  if (field.type === 'matrix') {
    return (
      <div className="bg-white border border-border rounded-xl px-4 py-3">
        <div className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-1.5 text-[12px]">
          <div className="font-mono text-[10px] text-slate/70 tracking-widest uppercase">Symptom</div>
          <div className="font-mono text-[10px] text-slate/70 tracking-widest uppercase">0 · 1 · 2 · 3 · 4</div>
          {field.options.map((sym) => (
            <ul key={sym} className="contents">
              <li className="text-slate">{sym}</li>
              <li className="font-mono text-[11px] text-slate/40">○ ○ ○ ○ ○</li>
            </ul>
          ))}
        </div>
      </div>
    )
  }
  if (field.type === 'rank') {
    return (
      <div className="bg-white border border-border rounded-xl px-4 py-3 space-y-1.5 text-[12px] text-slate">
        {field.options.map((opt) => (
          <div key={opt} className="flex items-center gap-3">
            <span className="font-mono text-[11px] text-slate/60 w-8">___</span>
            <span>{opt}</span>
          </div>
        ))}
      </div>
    )
  }
  return null
}
