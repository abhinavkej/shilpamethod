import { useParams } from 'react-router-dom'
import { PageShell, H1, Mono } from '../ui'

// §7.3 + §14 live-session control panel
export default function AdminLiveSession() {
  const { sessionId } = useParams()
  return (
    <PageShell maxWidth="max-w-4xl">
      <Mono className="block mb-2 text-coral">Live session control · {sessionId}</Mono>
      <H1>Day 1 · 38 min in</H1>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white border border-border rounded-2xl p-5">
          <div className="font-mono text-[11px] text-coral tracking-widest uppercase mb-3">Live poll</div>
          <div className="text-[15px] text-forest mb-3">
            Q: "On a scale of 1–10, how confident do you feel about your understanding of perimenopause?"
          </div>
          <div className="text-[40px] font-display text-forest leading-none">6.8</div>
          <div className="font-mono text-[10px] text-slate tracking-widest uppercase mt-1">42 responses</div>
          <div className="h-2 bg-border/50 rounded-full mt-3">
            <div className="h-full bg-coral rounded-full" style={{ width: '68%' }} />
          </div>
        </div>
        <div className="bg-white border border-border rounded-2xl p-5">
          <div className="font-mono text-[11px] text-coral tracking-widest uppercase mb-3">Top question themes</div>
          <ol className="space-y-2 text-[14px] text-forest list-decimal list-inside">
            <li>HRT risk — esp. if family history of clots (14)</li>
            <li>Lab interpretation — fasting insulin (9)</li>
            <li>Lifestyle — sleep specifically (7)</li>
            <li>Supplements — what actually works (5)</li>
            <li>Partner relationship (3)</li>
          </ol>
          <div className="font-mono text-[10px] text-slate tracking-widest uppercase mt-3">
            Categorized via Claude system prompt
          </div>
        </div>
      </div>

      <div className="bg-white border border-border rounded-2xl p-5 mb-6">
        <div className="flex justify-between items-baseline mb-3">
          <div className="font-mono text-[11px] text-coral tracking-widest uppercase">Attendance</div>
          <div className="text-[14px] text-forest">46 / 47</div>
        </div>
        <div className="text-[12px] text-slate">1 member missing — notified 10 min in, Kai is checking in.</div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button className="bg-coral text-cream text-[13px] px-4 py-2 rounded-full">
          Send Meet link to all (failsafe)
        </button>
        <button className="border border-border text-slate text-[13px] px-4 py-2 rounded-full hover:border-forest hover:text-forest">
          Push top theme to Shilpa
        </button>
      </div>
    </PageShell>
  )
}
