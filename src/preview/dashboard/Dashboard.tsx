import { useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import MemberHeader from './MemberHeader'
import Onboarding from './Onboarding'
import RunwayDashboard from './Runway'
import LiveDashboard from './Live'
import PostProgramDashboard from './Post'
import NoEnrollment from './NoEnrollment'

// §1 — dashboard router. In prod this is server-side using auth() + Prisma + computePhase().
// Phase is local React state seeded from the URL param — the phase switcher and onComplete
// both call setPhase() directly, which avoids URLSearchParams mutation bugs on transition.

type Phase = 'onboarding' | 'runway' | 'live' | 'post' | 'none'

export default function Dashboard() {
  const [params] = useSearchParams()

  // Seed phase from URL param once; phase switcher and onComplete drive it via setState.
  const [phase, setPhase] = useState<Phase>(
    () => (params.get('phase') || 'onboarding') as Phase
  )

  const days = parseInt(params.get('days') || '10', 10)
  const intakeState = (params.get('intake') || 'incomplete') as 'incomplete' | 'complete'
  const firstName = params.get('name') || 'Sarah'

  return (
    <>
      <MemberHeader firstName={firstName} email="test+member@shilpamethod.com" />
      <PhaseSwitcher active={phase} onChange={setPhase} />
      {phase === 'onboarding' && (
        <Onboarding
          firstName={firstName}
          onComplete={() => setPhase('runway')}
        />
      )}
      {phase === 'runway' && (
        <RunwayDashboard daysToStart={days} intakeComplete={intakeState === 'complete'} />
      )}
      {phase === 'live' && <LiveDashboard />}
      {phase === 'post' && <PostProgramDashboard />}
      {phase === 'none' && <NoEnrollment firstName={firstName} />}
    </>
  )
}

function PhaseSwitcher({
  active,
  onChange,
}: {
  active: Phase
  onChange: (p: Phase) => void
}) {
  const phases: { id: Phase; label: string }[] = [
    { id: 'onboarding', label: 'Onboarding' },
    { id: 'runway', label: 'Runway' },
    { id: 'live', label: 'Live' },
    { id: 'post', label: 'Post' },
    { id: 'none', label: 'No enrollment' },
  ]

  return (
    <div className="max-w-5xl mx-auto px-6 pt-4 pb-0">
      <div className="flex flex-wrap items-center gap-2 text-[12px] text-slate bg-sand/60 border border-border rounded-full px-3 py-1.5 w-fit">
        <span className="font-mono text-[10px] uppercase tracking-widest text-coral">
          Preview phase
        </span>
        {phases.map(({ id, label }) =>
          id === active ? (
            <span
              key={id}
              className="bg-forest text-cream px-3 py-1 rounded-full font-mono text-[10px] tracking-widest uppercase"
            >
              {label}
            </span>
          ) : (
            <button
              key={id}
              onClick={() => onChange(id)}
              className="border border-border bg-white text-slate hover:text-forest hover:border-forest px-3 py-1 rounded-full font-mono text-[10px] tracking-widest uppercase"
            >
              {label}
            </button>
          )
        )}
      </div>
    </div>
  )
}
