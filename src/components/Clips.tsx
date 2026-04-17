import { useRef } from 'react'
import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, viewportConfig } from '../lib/motion'

// Transcript snippets render below every clip — SEO + accessibility. Do not remove.
// These are high-intent search terms: "perimenopause sleep", "HRT vs BHRT", etc.
const CLIPS = [
  {
    token: '{{CLIP_1}}',
    speaker: 'Shilpa',
    title: 'Why perimenopause sleep breaks first',
    transcript:
      "Progesterone is your primary sleep hormone. As it declines in perimenopause, the architecture of your sleep changes — you fall asleep, but you can't stay there. The 3 AM wake-up is a hormonal signature, not anxiety.",
    duration: '1:47',
  },
  {
    token: '{{CLIP_2}}',
    speaker: 'Jocelyn',
    title: "Hormone confusion in my 40s — what's actually happening",
    transcript:
      "My doctor said my labs were fine. My body said otherwise. I was told I was too young for perimenopause, and too 'normal' for any of the things I was feeling. That five-year gap is where most women lose themselves — and nobody gave us a map.",
    duration: '2:12',
  },
  {
    token: '{{CLIP_3}}',
    speaker: 'Shilpa',
    title: 'HRT vs BHRT — the difference your doctor may not explain',
    transcript:
      'HRT is the umbrella. BHRT — bioidentical hormone therapy — uses molecules identical to what your body produces. The fear around hormones comes largely from a 2002 study using synthetic hormones, which has been substantially reanalyzed in the 20+ years since.',
    duration: '3:04',
  },
  {
    token: '{{CLIP_4}}',
    speaker: 'Shilpa',
    title: 'The one lab your OB-GYN probably skipped',
    transcript:
      "Fasting insulin. Not just glucose — insulin. The two together give you HOMA-IR, and HOMA-IR tells you where metabolic resistance is headed years before a fasting glucose flag appears. If your doctor hasn't ordered fasting insulin, you're flying with half the instruments.",
    duration: '2:38',
  },
  {
    token: '{{CLIP_5}}',
    speaker: 'Jocelyn',
    title: "What I actually did with Shilpa's framework",
    transcript:
      "I walked into my OB-GYN with a 2-page document. Specific questions, specific labs, a specific timeline. For the first time in four years, the appointment wasn't a negotiation — it was a conversation. That's what this boot camp builds for you.",
    duration: '1:58',
  },
  {
    token: '{{CLIP_6}}',
    speaker: 'Shilpa',
    title: 'Frozen shoulder in perimenopause — the hormone link',
    transcript:
      'Estrogen has direct anti-inflammatory effects on joint tissue. As it declines, synovial fluid changes and tendon flexibility decreases. Frozen shoulder affects 10–17% of perimenopausal women and is almost never connected to hormones by a conventional provider.',
    duration: '2:26',
  },
]

export default function Clips() {
  const scrollerRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollerRef.current) return
    const amount = scrollerRef.current.clientWidth * 0.85
    scrollerRef.current.scrollBy({
      left: dir === 'left' ? -amount : amount,
      behavior: 'smooth',
    })
  }

  return (
    <motion.section
      id="clips"
      className="py-24 md:py-32 px-6 bg-bone"
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={staggerContainer}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <motion.p variants={fadeInUp} className="text-label text-coral uppercase mb-4">
              From past webinars
            </motion.p>
            <motion.h2 variants={fadeInUp} className="font-display text-display-lg text-forest max-w-[620px]">
              How Shilpa actually talks about this.
            </motion.h2>
          </div>
          <motion.div variants={fadeInUp} className="flex gap-2">
            <button
              onClick={() => scroll('left')}
              className="w-10 h-10 rounded-full border border-border bg-cream hover:bg-sand transition-colors text-forest text-[18px]"
              aria-label="Scroll left"
            >
              ←
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-10 h-10 rounded-full border border-border bg-cream hover:bg-sand transition-colors text-forest text-[18px]"
              aria-label="Scroll right"
            >
              →
            </button>
          </motion.div>
        </div>

        <motion.div
          variants={fadeInUp}
          ref={scrollerRef}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 -mx-6 px-6 scroll-smooth"
          style={{ scrollbarWidth: 'none' }}
        >
          {CLIPS.map((clip) => (
            <article
              key={clip.token}
              className="snap-start flex-none w-[85%] sm:w-[340px] bg-cream border border-border rounded-2xl overflow-hidden"
            >
              {/* Video slot — placeholder aspect ratio */}
              <div className="relative aspect-[9/16] bg-gradient-to-br from-forest to-ivy flex items-center justify-center">
                <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 30% 30%, #D97757 0%, transparent 50%)' }} />
                <div className="relative z-10 flex flex-col items-center gap-3">
                  <div className="w-14 h-14 rounded-full bg-cream/90 flex items-center justify-center">
                    <span className="text-forest text-[20px] ml-1">▶</span>
                  </div>
                  <div className="font-mono text-[10px] text-cream/80 tracking-widest uppercase">
                    {clip.token}
                  </div>
                  <div className="font-mono text-[10px] text-cream/60">{clip.duration}</div>
                </div>
                <div className="absolute top-3 left-3 bg-cream/90 text-forest text-[11px] font-medium px-2.5 py-0.5 rounded-full">
                  {clip.speaker}
                </div>
              </div>

              {/* Title + transcript (SEO!) */}
              <div className="p-5">
                <h3 className="font-display text-[19px] text-forest mb-3 leading-snug">
                  {clip.title}
                </h3>
                <p className="text-[13px] text-slate leading-relaxed italic border-l-2 border-coral/50 pl-3">
                  {clip.transcript}
                </p>
                <div className="font-mono text-[9px] text-slate tracking-widest uppercase mt-3">
                  Transcript · Searchable
                </div>
              </div>
            </article>
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}
