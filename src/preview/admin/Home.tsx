import { Link } from 'react-router-dom'
import { PageShell, H1, Mono } from '../ui'

// §14 admin additions + §7.12 prior
export default function AdminHome() {
  return (
    <PageShell maxWidth="max-w-5xl">
      <Mono className="block mb-2 text-coral">Admin · Cohort 1</Mono>
      <H1>Everything you need, nothing you don't.</H1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <Stat n="47" l="Enrolled" />
        <Stat n="3" l="Remaining" />
        <Stat n="38" l="Intakes complete" />
        <Stat n="9.2" l="NPS avg (Day 1)" />
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-10">
        <Card to="/preview/admin/cohorts/june-2026" title="Cohort detail · June 2026" desc="Edit dates, sessions, recording URLs, workbook schemas." />
        <Card to="/preview/admin/users/sarah-chen" title="User deep-dive · Sarah Chen" desc="Intake as clinical chart, workbooks, reflections, Coach Kai history." />
        <Card to="/preview/admin/live-session/day-1" title="Live session control panel · Day 1" desc="Real-time poll results, top 5 question themes, attendance." />
        <Card to="/preview/admin/post-program" title="Post-program tracking" desc="Appointment outcomes, Forum/Mukta referrals." />
      </div>
    </PageShell>
  )
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div className="bg-white border border-border rounded-2xl p-5">
      <div className="font-display text-[36px] text-forest leading-none">{n}</div>
      <div className="font-mono text-[10px] text-slate tracking-widest uppercase mt-2">{l}</div>
    </div>
  )
}

function Card({ to, title, desc }: { to: string; title: string; desc: string }) {
  return (
    <Link to={to} className="bg-white border border-border rounded-2xl p-5 hover:border-forest transition-colors block">
      <div className="text-[16px] text-forest font-medium mb-1">{title}</div>
      <div className="text-[13px] text-slate">{desc}</div>
    </Link>
  )
}
