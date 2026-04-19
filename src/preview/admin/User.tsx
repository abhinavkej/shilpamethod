import { useParams } from 'react-router-dom'
import { PageShell, H1, Mono } from '../ui'

export default function AdminUser() {
  const { id } = useParams()
  return (
    <PageShell maxWidth="max-w-4xl">
      <Mono className="block mb-2 text-coral">Admin · Users · {id}</Mono>
      <H1>Sarah Chen · age 45-49 · US · Cohort 1</H1>

      <section className="mb-8">
        <div className="font-mono text-[11px] text-coral tracking-widest uppercase mb-3">Intake (clinical chart)</div>
        <div className="bg-white border border-border rounded-2xl p-6 space-y-4 text-[14px]">
          <Row label="Family history" value="DVT/stroke ✓ · Heart disease ✓ · Dementia ✓" />
          <Row label="Personal history" value="No prior DVT · No cancer · No miscarriages" />
          <Row label="Cycle status" value="Irregular, last period 6 weeks ago" />
          <Row label="Top symptoms (1-5)" value="Sleep 5 · Joint pain 5 · Brain fog 4 · Fatigue 4 · Anxiety 4" />
          <Row label="Sleep / exercise / stress" value="6.5 hrs · 90 min/wk · 7/10 stress" />
          <Row label="Top goal" value="I want to feel like myself again. I want my brain back." />
          <Row label="Top concern" value="Scared of HRT because of what my mom went through." />
          <Row label="Already tried" value="Cut alcohol, started lifting, tried adaptogens. Nothing stuck." />
        </div>
      </section>

      <section className="mb-8 grid md:grid-cols-2 gap-4">
        <div className="bg-white border border-border rounded-2xl p-5">
          <div className="font-mono text-[11px] text-coral tracking-widest uppercase mb-2">Workbook responses</div>
          <ul className="text-[13px] text-slate space-y-1.5">
            <li>Day 1: complete · "Brain fog, 1-2 years"</li>
            <li>Day 2: complete · clotting-yellow, cv-red</li>
            <li>Day 3: in progress (3 of 6)</li>
          </ul>
        </div>
        <div className="bg-white border border-border rounded-2xl p-5">
          <div className="font-mono text-[11px] text-coral tracking-widest uppercase mb-2">Reflections</div>
          <ul className="text-[13px] text-slate space-y-1.5 italic">
            <li>D1: "That what I've been experiencing has a name."</li>
            <li>D2: "Mom's stroke history mattered for me."</li>
            <li>D3: "I want a fasting insulin and free testosterone."</li>
          </ul>
        </div>
      </section>

      <section className="mb-8">
        <div className="font-mono text-[11px] text-coral tracking-widest uppercase mb-3">Coach Kai — last 5 messages</div>
        <div className="bg-white border border-border rounded-2xl p-5 space-y-2 text-[13px]">
          <div><span className="font-mono text-[10px] text-slate tracking-widest uppercase">User</span> "When should I ask about testosterone?"</div>
          <div className="text-slate/80"><span className="font-mono text-[10px] text-coral tracking-widest uppercase">Kai</span> "Day 3 covers sexual health. If you want, I can flag this for Shilpa so she addresses it directly."</div>
          <div><span className="font-mono text-[10px] text-slate tracking-widest uppercase">User</span> "Yes please."</div>
          <div className="text-slate/80"><span className="font-mono text-[10px] text-coral tracking-widest uppercase">Kai</span> "Done. Tagged. Dr. N reviewed this reply — 3m ago."</div>
        </div>
      </section>

      <section className="flex flex-wrap gap-2">
        <button className="bg-forest text-cream text-[13px] px-4 py-2 rounded-full">Nudge intake on WhatsApp</button>
        <button className="border border-border text-slate text-[13px] px-4 py-2 rounded-full hover:border-forest hover:text-forest">
          Regenerate document
        </button>
        <button className="border border-border text-slate text-[13px] px-4 py-2 rounded-full hover:border-forest hover:text-forest">
          Open conversation →
        </button>
      </section>
    </PageShell>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-4">
      <div className="font-mono text-[10px] text-slate tracking-widest uppercase sm:w-[180px] flex-none">{label}</div>
      <div className="text-forest">{value}</div>
    </div>
  )
}
