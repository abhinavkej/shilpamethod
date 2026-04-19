import { useRef } from 'react'
import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, viewportConfig } from '../lib/motion'
import { WEBINAR_CLIPS } from '../config/placeholders'

// Clip data (titles, transcripts, YouTube IDs) lives in src/config/placeholders.ts.
// Transcript snippets render below every clip — SEO + accessibility. Do not remove.

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
          {WEBINAR_CLIPS.map((clip) => {
            const hasVideo = clip.youtubeId.trim().length > 0
            return (
              <article
                key={clip.n}
                className="snap-start flex-none w-[85%] sm:w-[340px] bg-cream border border-border rounded-2xl overflow-hidden"
              >
                {/* Video slot */}
                {hasVideo ? (
                  <div className="relative aspect-[9/16]">
                    <iframe
                      src={`https://www.youtube.com/embed/${clip.youtubeId}`}
                      title={clip.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                    />
                    <div className="absolute top-3 left-3 bg-cream/90 text-forest text-[11px] font-medium px-2.5 py-0.5 rounded-full pointer-events-none">
                      {clip.speaker}
                    </div>
                  </div>
                ) : (
                  <div className="relative aspect-[9/16] bg-gradient-to-br from-forest to-ivy flex items-center justify-center">
                    <div
                      className="absolute inset-0 opacity-30"
                      style={{
                        backgroundImage:
                          'radial-gradient(circle at 30% 30%, #D97757 0%, transparent 50%)',
                      }}
                    />
                    <div className="relative z-10 flex flex-col items-center gap-3">
                      <div className="w-14 h-14 rounded-full bg-cream/90 flex items-center justify-center">
                        <span className="text-forest text-[20px] ml-1">▶</span>
                      </div>
                      <div className="font-mono text-[10px] text-cream/80 tracking-widest uppercase">
                        {`{{CLIP_${clip.n}}}`}
                      </div>
                      <div className="font-mono text-[10px] text-cream/60">{clip.durationLabel}</div>
                      <div className="font-mono text-[9px] text-coral-soft tracking-widest uppercase mt-2">
                        Awaiting video · see HANDOFF
                      </div>
                    </div>
                    <div className="absolute top-3 left-3 bg-cream/90 text-forest text-[11px] font-medium px-2.5 py-0.5 rounded-full">
                      {clip.speaker}
                    </div>
                  </div>
                )}

                {/* Title + transcript (SEO) */}
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
            )
          })}
        </motion.div>
      </div>
    </motion.section>
  )
}
