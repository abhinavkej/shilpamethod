import { useState } from 'react'
import { PageShell, ProgressBar, H1, PrimaryButton, Mono, TextInput } from '../ui'

export default function IntakeLifestyle() {
  const [exercise, setExercise] = useState(120)
  const [sleep, setSleep] = useState(6.5)
  const [stress, setStress] = useState(7)
  const [onHrt, setOnHrt] = useState<'yes' | 'no' | null>(null)
  const [supplements, setSupplements] = useState('')

  return (
    <PageShell maxWidth="max-w-2xl">
      <ProgressBar value={3} total={4} />
      <Mono className="block mb-2">Step 3 · Lifestyle</Mono>
      <H1>How your week is shaped right now.</H1>

      <div className="space-y-7 mb-10">
        <Slider
          label="Minutes/week of moderate-to-vigorous exercise"
          min={0}
          max={300}
          step={15}
          value={exercise}
          onChange={setExercise}
          suffix="min"
        />
        <Slider
          label="Average hours of sleep"
          min={4}
          max={10}
          step={0.5}
          value={sleep}
          onChange={setSleep}
          suffix="hrs"
        />
        <Slider
          label="Stress level (1 low · 10 high)"
          min={1}
          max={10}
          step={1}
          value={stress}
          onChange={setStress}
          suffix=""
        />

        <div>
          <div className="font-mono text-[10px] text-slate tracking-widest uppercase mb-2">
            Are you currently on any form of HRT or BHRT?
          </div>
          <div className="flex gap-2">
            {(['yes', 'no'] as const).map((v) => (
              <button
                key={v}
                onClick={() => setOnHrt(v)}
                className={`text-[14px] px-5 py-2 rounded-full border transition-colors capitalize ${
                  onHrt === v
                    ? 'bg-forest text-cream border-forest'
                    : 'bg-white text-slate border-border hover:border-forest'
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        <TextInput
          label="Supplements you take (optional, free text)"
          value={supplements}
          onChange={setSupplements}
          placeholder="e.g., Vitamin D 2000 IU, Magnesium glycinate, Omega-3…"
        />
      </div>

      <PrimaryButton to="/preview/intake/goals">Save and continue →</PrimaryButton>
    </PageShell>
  )
}

function Slider({
  label,
  min,
  max,
  step,
  value,
  onChange,
  suffix,
}: {
  label: string
  min: number
  max: number
  step?: number
  value: number
  onChange: (v: number) => void
  suffix: string
}) {
  return (
    <div>
      <div className="flex justify-between items-baseline mb-2">
        <div className="font-mono text-[10px] text-slate tracking-widest uppercase">{label}</div>
        <div className="font-mono text-[12px] text-forest">
          {value}
          {suffix && ` ${suffix}`}
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step || 1}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full accent-coral"
      />
    </div>
  )
}
