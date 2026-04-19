import { Link } from 'react-router-dom'
import { PageShell, H1, Lede, Mono } from '../ui'

const STEPS = [
  { id: 'risk', n: '01', title: 'Family & Personal History', to: '/preview/intake/risk', status: 'Complete' },
  { id: 'symptoms', n: '02', title: 'Your Cycle & Symptoms', to: '/preview/intake/symptoms', status: 'In progress' },
  { id: 'lifestyle', n: '03', title: 'Lifestyle', to: '/preview/intake/lifestyle', status: 'Not started' },
  { id: 'goals', n: '04', title: 'Goals & Concerns', to: '/preview/intake/goals', status: 'Not started' },
]

export default function IntakeOverview() {
  return (
    <PageShell maxWidth="max-w-2xl">
      <Mono className="block mb-4">Intake · 4 steps · ~10 minutes</Mono>
      <H1>Let's get to know you before we start.</H1>
      <Lede>
        This takes about 10 minutes. Coach Kai will help you along the way. Your answers shape what
        Dr. Saxena emphasizes during your cohort sessions and what goes into your Patient Advocacy
        Document.
      </Lede>

      <div className="bg-white border border-border rounded-2xl divide-y divide-border/60">
        {STEPS.map((s) => (
          <Link
            key={s.id}
            to={s.to}
            className="flex items-center justify-between gap-4 px-5 py-5 hover:bg-sand/40 transition-colors"
          >
            <div className="flex items-center gap-4">
              <span className="font-mono text-[12px] text-slate tracking-widest">{s.n}</span>
              <span className="text-[16px] text-forest font-medium">{s.title}</span>
            </div>
            <span
              className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full ${
                s.status === 'Complete'
                  ? 'bg-risk-low-bg text-risk-low'
                  : s.status === 'In progress'
                  ? 'bg-risk-med-bg text-risk-med'
                  : 'bg-sand text-slate'
              }`}
            >
              {s.status}
            </span>
          </Link>
        ))}
      </div>

      <p className="text-[13px] text-slate italic mt-8">
        Each field has a small <span className="font-mono text-forest">Why we ask</span> link that opens a tooltip with
        Dr. Saxena's clinical reason.
      </p>
    </PageShell>
  )
}
