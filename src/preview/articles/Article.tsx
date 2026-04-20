import { useParams, Link } from 'react-router-dom'
import { ARTICLES } from '../../data/articles'

const CATEGORY_COLORS: Record<string, string> = {
  Science: 'bg-sage/20 text-sage',
  Labs: 'bg-amber-50 text-amber-700',
  Treatment: 'bg-coral/10 text-coral',
  Lifestyle: 'bg-forest/10 text-forest',
  Advocacy: 'bg-sand text-slate',
}

export default function ArticleReader() {
  const { slug } = useParams<{ slug: string }>()
  const article = ARTICLES.find((a) => a.slug === slug)
  const others = ARTICLES.filter((a) => a.slug !== slug).slice(0, 3)

  if (!article) {
    return (
      <main className="max-w-2xl mx-auto px-6 py-20 text-center">
        <div className="font-display text-[28px] text-forest mb-4">Article not found.</div>
        <Link to="/preview/resources" className="text-coral hover:underline">
          ← Back to Resources
        </Link>
      </main>
    )
  }

  return (
    <main className="max-w-2xl mx-auto px-6 pb-24 pt-8">
      {/* Back */}
      <Link
        to="/preview/resources"
        className="inline-flex items-center gap-1.5 text-[13px] text-slate hover:text-forest mb-8"
      >
        ← Resources
      </Link>

      {/* Category + meta */}
      <div className="flex items-center gap-3 mb-4">
        <span className={`font-mono text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-full ${CATEGORY_COLORS[article.category] ?? 'bg-sand text-slate'}`}>
          {article.category}
        </span>
        <span className="font-mono text-[10px] text-slate tracking-widest uppercase">{article.readTime} read</span>
      </div>

      {/* Title */}
      <h1 className="font-display text-display-md text-forest mb-4 leading-tight">{article.title}</h1>

      {/* Summary */}
      <p className="text-[17px] text-slate leading-relaxed mb-6 border-l-2 border-coral/40 pl-4 italic">
        {article.summary}
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 mb-10 pb-8 border-b border-border">
        <div className="w-9 h-9 bg-forest rounded-full flex items-center justify-center text-cream text-[13px] font-medium flex-none">
          {article.author === 'Dr. Shilpa Saxena, MD' ? 'S' : 'J'}
        </div>
        <div>
          <div className="text-[14px] font-medium text-forest">{article.author}</div>
          <div className="font-mono text-[10px] text-slate tracking-widest uppercase">
            {article.author === 'Dr. Shilpa Saxena, MD'
              ? 'Board-Certified Family Medicine · IFM Faculty · Forum Health CMO'
              : 'Patient Advocate · The Hormone Method Cohort 1'}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="space-y-6">
        {article.sections.map((s, i) => (
          <div key={i}>
            {s.heading && (
              <h2 className="font-display text-[22px] text-forest mb-2">{s.heading}</h2>
            )}
            <p className="text-[16px] text-ink leading-relaxed">{s.body}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-16 bg-forest text-cream rounded-2xl px-8 py-8">
        <div className="font-mono text-[10px] text-coral-soft tracking-widest uppercase mb-3">3-Day Live Boot Camp</div>
        <h2 className="font-display text-[26px] mb-3 leading-snug">
          Learn this in real time with Dr. Saxena — and leave with a document for your doctor.
        </h2>
        <p className="text-[14px] text-cream/75 mb-5">
          Every article in this library is covered live across the three sessions. You'll also build a personalized Patient Advocacy Document during the program.
        </p>
        <Link
          to="/#registration"
          className="inline-flex bg-coral text-cream text-[15px] px-6 py-3 rounded-full hover:bg-rust transition-colors"
        >
          Reserve your spot →
        </Link>
      </div>

      {/* Related */}
      {others.length > 0 && (
        <div className="mt-12">
          <div className="font-mono text-[10px] text-coral tracking-widest uppercase mb-5">More from the library</div>
          <div className="space-y-3">
            {others.map((a) => (
              <Link
                key={a.slug}
                to={`/preview/articles/${a.slug}`}
                className="block bg-white border border-border rounded-xl px-5 py-4 hover:border-forest hover:bg-sand/30 transition-colors"
              >
                <div className="text-[15px] text-forest font-medium leading-snug mb-1">{a.title}</div>
                <div className="text-[12px] text-slate">{a.readTime} · {a.category}</div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </main>
  )
}
