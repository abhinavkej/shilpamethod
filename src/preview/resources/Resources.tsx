import { Link } from 'react-router-dom'
import { PageShell, H1, Mono } from '../ui'
import { WEBINAR_CLIPS } from '../../config/placeholders'
import { ARTICLES } from '../../data/articles'

const YT_PLAYLIST = 'PL0P26CWBMQZp25RVUHbshhy_0MdpUbabx'

export default function Resources() {
  return (
    <PageShell maxWidth="max-w-5xl">
      <Mono className="block mb-2 text-coral">Resources</Mono>
      <H1>Everything Shilpa points to.</H1>

      <section className="mb-12">
        <div className="font-mono text-[11px] text-coral tracking-widest uppercase mb-4">Short clips</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {WEBINAR_CLIPS.map((c) => (
            <div key={c.n} className="bg-white border border-border rounded-2xl overflow-hidden">
              <div className="aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${c.youtubeId}?list=${YT_PLAYLIST}&rel=0&modestbranding=1`}
                  title={c.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
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
          {ARTICLES.map((a) => (
            <Link
              key={a.slug}
              to={`/preview/articles/${a.slug}`}
              className="flex items-center justify-between px-5 py-4 hover:bg-sand/30 cursor-pointer group"
            >
              <div className="text-[15px] text-forest group-hover:underline underline-offset-4">{a.title}</div>
              <div className="font-mono text-[11px] text-slate tracking-widest uppercase flex-none ml-4">{a.readTime} read</div>
            </Link>
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
