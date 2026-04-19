import { useSearchParams, Link } from 'react-router-dom'
import RunwayDashboard from './Runway'
import LiveDashboard from './Live'
import PostProgramDashboard from './Post'

// §6.1 — time-aware router. In prod this is server-side using cohort.startDate.
// Here we expose a ?phase= switcher so you can jump between dashboard variants.

export default function Dashboard() {
  const [params] = useSearchParams()
  const phase = (params.get('phase') || 'runway') as 'runway' | 'live' | 'post'
  const days = parseInt(params.get('days') || '10', 10)

  return (
    <div>
      <PhaseSwitcher active={phase} />
      {phase === 'runway' && <RunwayDashboard daysToStart={days} />}
      {phase === 'live' && <LiveDashboard />}
      {phase === 'post' && <PostProgramDashboard />}
    </div>
  )
}

function PhaseSwitcher({ active }: { active: 'runway' | 'live' | 'post' }) {
  const btn = (phase: string, label: string, q = '') =>
    active === phase ? (
      <span className="bg-forest text-cream px-3 py-1 rounded-full font-mono text-[10px] tracking-widest uppercase">
        {label}
      </span>
    ) : (
      <Link
        to={`/preview/dashboard?phase=${phase}${q}`}
        className="border border-border bg-white text-slate hover:text-forest hover:border-forest px-3 py-1 rounded-full font-mono text-[10px] tracking-widest uppercase"
      >
        {label}
      </Link>
    )

  return (
    <div className="max-w-5xl mx-auto px-6 pt-4">
      <div className="flex flex-wrap items-center gap-2 text-[12px] text-slate bg-sand/60 border border-border rounded-full px-3 py-1.5 w-fit">
        <span className="font-mono text-[10px] uppercase tracking-widest text-coral">Preview switch</span>
        {btn('runway', 'Runway')}
        {btn('live', 'Live')}
        {btn('post', 'Post')}
      </div>
    </div>
  )
}
