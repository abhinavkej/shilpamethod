import { PageShell, H1, Mono } from '../ui'

const ROWS = [
  { name: 'Sarah Chen', since: 7, booked: true, outcome: 'doctor_supportive', doc: true, forum: false },
  { name: 'Aparna S.', since: 14, booked: false, outcome: null, doc: true, forum: false },
  { name: 'Beth M.', since: 14, booked: true, outcome: 'doctor_dismissive', doc: true, forum: true },
  { name: 'Chloe K.', since: 30, booked: true, outcome: 'labs_ordered', doc: true, forum: false },
  { name: 'Devi K.', since: 30, booked: true, outcome: 'hrt_started', doc: true, forum: false },
  { name: 'Emma L.', since: 45, booked: false, outcome: null, doc: false, forum: false },
]

export default function AdminPostProgram() {
  return (
    <PageShell maxWidth="max-w-5xl">
      <Mono className="block mb-2 text-coral">Admin · Post-program tracking</Mono>
      <H1>Who needs a nudge, who needs a referral.</H1>

      <div className="flex flex-wrap gap-2 mb-6">
        {['All', 'Not booked', 'Doctor dismissive', 'Forum referred', 'Needs Mukta', 'Supportive'].map((f, i) => (
          <button
            key={f}
            className={`text-[13px] px-4 py-1.5 rounded-full border ${
              i === 0 ? 'bg-forest text-cream border-forest' : 'bg-white text-slate border-border hover:border-forest'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="bg-white border border-border rounded-2xl overflow-hidden">
        <table className="w-full text-[13px]">
          <thead className="bg-sand/60">
            <tr className="text-left font-mono text-[10px] tracking-widest uppercase text-slate">
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Days since</th>
              <th className="px-4 py-3">Booked?</th>
              <th className="px-4 py-3">Outcome</th>
              <th className="px-4 py-3">Doc</th>
              <th className="px-4 py-3">Forum</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {ROWS.map((r) => (
              <tr key={r.name} className="hover:bg-sand/30">
                <td className="px-4 py-3 text-forest">{r.name}</td>
                <td className="px-4 py-3">T+{r.since}</td>
                <td className="px-4 py-3">{r.booked ? '✓' : '—'}</td>
                <td className="px-4 py-3 capitalize">{r.outcome?.replace(/_/g, ' ') || '—'}</td>
                <td className="px-4 py-3">{r.doc ? '✓' : '—'}</td>
                <td className="px-4 py-3">{r.forum ? '✓' : '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageShell>
  )
}
