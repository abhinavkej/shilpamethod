import { useState } from 'react'
import { PageShell, ProgressBar, H1, PrimaryButton, Mono } from '../ui'

const FAMILY = [
  { id: 'dvt', q: 'DVT, PE, or stroke before age 60?' },
  { id: 'breast', q: 'Breast cancer?' },
  { id: 'heart', q: 'Heart attack before age 60?' },
  { id: 'osteo', q: 'Osteoporosis or hip fracture?' },
  { id: 'dementia', q: "Dementia or Alzheimer's?" },
]
const PERSONAL = [
  { id: 'p_dvt', q: 'Have you ever had a blood clot, DVT, or PE?' },
  { id: 'p_cancer', q: 'Have you ever had cancer (any type)?' },
  { id: 'p_miscarriage', q: 'Have you had recurrent miscarriages (3+)?' },
  { id: 'p_hyst', q: 'Have you had a hysterectomy?' },
]

export default function IntakeRisk() {
  const [answers, setAnswers] = useState<Record<string, string>>({})

  return (
    <PageShell maxWidth="max-w-2xl">
      <ProgressBar value={1} total={4} />
      <Mono className="block mb-2">Step 1 · Family & Personal History</Mono>
      <H1>A few clot, cancer, and cardiac questions.</H1>
      <p className="text-body-md text-slate mb-10 leading-relaxed">
        Dr. Saxena uses this to calibrate your four risk axes. If you're not sure, "Don't know" is a
        valid answer — Coach Kai will help you clarify before Day 1.
      </p>

      <section className="mb-10">
        <div className="font-mono text-[11px] text-coral tracking-widest uppercase mb-4">
          Family history (1st-degree relatives)
        </div>
        <div className="bg-white border border-border rounded-2xl divide-y divide-border/60">
          {FAMILY.map((row) => (
            <RiskRow key={row.id} id={row.id} question={row.q} answers={answers} setAnswers={setAnswers} />
          ))}
        </div>
      </section>

      <section className="mb-10">
        <div className="font-mono text-[11px] text-coral tracking-widest uppercase mb-4">Personal history</div>
        <div className="bg-white border border-border rounded-2xl divide-y divide-border/60">
          {PERSONAL.map((row) => (
            <RiskRow key={row.id} id={row.id} question={row.q} answers={answers} setAnswers={setAnswers} yesNoOnly />
          ))}
        </div>
      </section>

      <PrimaryButton to="/preview/intake/symptoms">Save and continue →</PrimaryButton>
    </PageShell>
  )
}

function RiskRow({
  id,
  question,
  answers,
  setAnswers,
  yesNoOnly,
}: {
  id: string
  question: string
  answers: Record<string, string>
  setAnswers: (a: Record<string, string>) => void
  yesNoOnly?: boolean
}) {
  const options = yesNoOnly ? ['Yes', 'No'] : ['Yes', 'No', "Don't know"]
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between px-5 py-4">
      <div className="flex-1">
        <div className="text-[15px] text-forest">{question}</div>
        <button className="text-[11px] text-coral hover:underline underline-offset-4 mt-0.5">
          Why we ask →
        </button>
      </div>
      <div className="flex gap-2">
        {options.map((opt) => {
          const active = answers[id] === opt
          return (
            <button
              key={opt}
              onClick={() => setAnswers({ ...answers, [id]: opt })}
              className={`text-[13px] px-3 py-1.5 rounded-full border transition-colors ${
                active
                  ? 'bg-forest text-cream border-forest'
                  : 'bg-white text-slate border-border hover:border-forest'
              }`}
            >
              {opt}
            </button>
          )
        })}
      </div>
    </div>
  )
}
