import { PageShell, H1, Mono } from '../ui'
import { WEBINAR_CLIPS } from '../../config/placeholders'

const READING = [
  { t: 'The Women\'s Health Initiative — what they got wrong', d: '8-min read' },
  { t: 'Why your TSH alone is not enough', d: '5-min read' },
  { t: 'The four risk axes, in plain English', d: '6-min read' },
  { t: 'How to read your own lipid panel like a cardiologist', d: '10-min read' },
]

export default function Resources() {
  return (
    <PageShell maxWidth="max-w-5xl">
      <Mono className="block mb-2 text-coral">Resources</Mono>
      <H1>Everything Shilpa points to.</H1>

      <section className="mb-12">
        <div className="font-mono text-[11px] text-coral tracking-widest uppercase mb-4">Webinar replays</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {WEBINAR_CLIPS.map((c) => (
            <div key={c.n} className="bg-white border border-border rounded-2xl overflow-hidden">
              <div className="aspect-video bg-forest text-cream flex items-center justify-center">
                <span className="font-mono text-[11px] tracking-widest uppercase">{`{{CLIP_${c.n}}}`}</span>
              </div>
              <div className="p-4">
                <div className="text-[14px] text-forest font-medium mb-1 leading-tight">{c.title}</div>
                <div className="text-[11px] text-slate">{c.speaker} · {c.durationLabel}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <div className="font-mono text-[11px] text-coral tracking-widest uppercase mb-4">Reading list</div>
        <div className="bg-white border border-border rounded-2xl divide-y divide-border/60">
          {READING.map((r) => (
            <div key={r.t} className="flex items-center justify-between px-5 py-4 hover:bg-sand/30 cursor-pointer">
              <div className="text-[15px] text-forest">{r.t}</div>
              <div className="font-mono text-[11px] text-slate tracking-widest uppercase">{r.d}</div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="font-mono text-[11px] text-coral tracking-widest uppercase mb-4">Guides (PDF)</div>
        <div className="bg-white border border-border rounded-2xl p-5">
          <div className="text-[15px] text-forest">Forum Health BHRT Guide</div>
          <div className="text-[12px] text-slate mt-1">
            TODO(areef): upload to Vercel Blob once Shilpa approves the final version.
          </div>
        </div>
      </section>
    </PageShell>
  )
}
