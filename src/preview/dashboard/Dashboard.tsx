import { useSearchParams, Link } from 'react-router-dom'
import MemberHeader from './MemberHeader'
import Onboarding from './Onboarding'
import RunwayDashboard from './Runway'
import LiveDashboard from './Live'
import PostProgramDashboard from './Post'
import NoEnrollment from './NoEnrollment'

// §1 — dashboard router. In prod this is server-side using auth() + Prisma + computePhase().
// Here the phase is switchable via ?phase=onboarding|runway|live|post|none for demo.

type Phase = 'onboarding' | 'runway' | 'live' | 'post' | 'none'

export default function Dashboard() {
  const [params] = useSearchParams()
  const phase = (params.get('phase') || 'onboarding') as Phase
  const days = parseInt(params.get('days') || '10', 10)
  const intakeState = (params.get('intake') || 'incomplete') as 'incomplete' | 'complete'

  // ?name= lets the welcome email deep-link into a personalized preview.
  const nameParam = params.get('name')
  const firstName = nameParam || 'Sarah'

  return (
    <>
      <MemberHeader firstName={firstName} email="test+member@shilpamethod.com" />
      <PhaseSwitcher active={phase} />
      {phase === 'onboarding' && <Onboarding firstName={firstName} />}
      {phase === 'runway' && <RunwayDashboard daysToStart={days} intakeComplete={intakeState === 'complete'} />}
      {phase === 'live' && <LiveDashboard />}
      {phase === 'post' && <PostProgramDashboard />}
      {phase === 'none' && <NoEnrollment firstName={firstName} />}
    </>
  )
}

function PhaseSwitcher({ active }: { active: Phase }) {
  const btn = (phase: Phase, label: string) => {
    const isActive = active === phase
    return isActive ? (
      <span className="bg-forest text-cream px-3 py-1 rounded-full font-mono text-[10px] tracking-widest uppercase">
        {label}
      </span>
    ) : (
      <Link
        to={`/preview/dashboard?phase=${phase}`}
        className="border border-border bg-white text-slate hover:text-forest hover:border-forest px-3 py-1 rounded-full font-mono text-[10px] tracking-widest uppercase"
      >
        {label}
      </Link>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-6 pt-4 pb-0">
      <div className="flex flex-wrap items-center gap-2 text-[12px] text-slate bg-sand/60 border border-border rounded-full px-3 py-1.5 w-fit">
        <span className="font-mono text-[10px] uppercase tracking-widest text-coral">Preview phase</span>
        {btn('onboarding', 'Onboarding')}
        {btn('runway', 'Runway')}
        {btn('live', 'Live')}
        {btn('post', 'Post')}
        {btn('none', 'No enrollment')}
      </div>
    </div>
  )
}
