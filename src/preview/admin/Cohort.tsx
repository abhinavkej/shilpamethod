import { useParams } from 'react-router-dom'
import { PageShell, H1, Mono } from '../ui'

export default function AdminCohort() {
  const { id } = useParams()
  return (
    <PageShell maxWidth="max-w-4xl">
      <Mono className="block mb-2 text-coral">Admin · Cohorts · {id}</Mono>
      <H1>June 2026 Cohort</H1>

      <section className="mb-8">
        <div className="font-mono text-[11px] text-coral tracking-widest uppercase mb-3">Sessions</div>
        {[1, 2, 3].map((d) => (
          <div key={d} className="bg-white border border-border rounded-2xl p-5 mb-3">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <div className="font-mono text-[10px] text-slate tracking-widest uppercase mb-1">Day {d}</div>
                <div className="text-[18px] text-forest font-medium">
                  {d === 1 ? 'Identify Your Story' : d === 2 ? 'Understand Your Numbers' : 'Build Your Playbook'}
                </div>
              </div>
              <div className="font-mono text-[11px] text-slate">June {1 + d}, 2026 · 7 PM ET</div>
            </div>
            <div className="grid md:grid-cols-2 gap-3 text-[13px]">
              <Row label="Meet URL" value="https://meet.google.com/PLACEHOLDER-DAY{d}" />
              <Row label="Recording URL" value={d <= 2 ? 'https://blob.vercel-storage.com/rec-day-' + d : '— not uploaded'} />
              <Row label="Workbook schema" value={`WORKBOOK_DAY_${d}.json`} />
              <Row label="Slides PDF" value={`slides-day-${d}.pdf`} />
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              <button className="text-[12px] bg-forest text-cream px-3 py-1.5 rounded-full">Upload recording</button>
              <button className="text-[12px] border border-border px-3 py-1.5 rounded-full hover:border-forest">
                Edit session
              </button>
            </div>
          </div>
        ))}
      </section>

      <section className="mb-8">
        <div className="font-mono text-[11px] text-coral tracking-widest uppercase mb-3">Attendance & NPS</div>
        <div className="grid grid-cols-3 gap-3">
          {[
            { d: 'Day 1', att: '46 / 47', nps: '9.2' },
            { d: 'Day 2', att: '45 / 47', nps: '9.4' },
            { d: 'Day 3', att: '—', nps: '—' },
          ].map((x) => (
            <div key={x.d} className="bg-white border border-border rounded-xl p-4">
              <div className="font-mono text-[10px] text-slate tracking-widest uppercase">{x.d}</div>
              <div className="text-[14px] text-forest mt-1">Attendance {x.att}</div>
              <div className="text-[14px] text-forest">NPS {x.nps}</div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="font-mono text-[11px] text-coral tracking-widest uppercase mb-3">Cohort WhatsApp group</div>
        <div className="bg-white border border-border rounded-2xl p-5">
          <div className="text-[13px] text-slate mb-3">
            Paste the invite URL after manually creating the group in WhatsApp Business.
          </div>
          <input
            placeholder="https://chat.whatsapp.com/…"
            className="w-full bg-white border border-border rounded-xl px-4 py-2 text-[14px] mb-3 focus:border-forest focus:outline-none"
          />
          <label className="flex items-center gap-2 text-[13px] text-slate">
            <input type="checkbox" className="accent-coral" /> Group is open (visible in member dashboards)
          </label>
        </div>
      </section>
    </PageShell>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-sand/40 rounded-lg px-3 py-2">
      <div className="font-mono text-[10px] text-slate tracking-widest uppercase">{label}</div>
      <div className="text-[13px] text-forest truncate">{value}</div>
    </div>
  )
}
