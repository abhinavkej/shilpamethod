import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, viewportConfig } from '../lib/motion'

const ROWS = [
  {
    label: 'Format',
    course: '5 pre-recorded modules · 15 hrs of video',
    us: '3 live sessions · 75 min each',
  },
  {
    label: 'Interaction',
    course: 'One-way. Async. Watch and hope.',
    us: 'Two-way. Live Q&A every session.',
  },
  {
    label: 'Takeaway',
    course: 'A 280-page generic PDF',
    us: '1–2 page Patient Advocacy Document — personalized to you',
  },
  {
    label: 'Follow-up',
    course: 'Community Discord, if lucky',
    us: 'Coach Kai (WhatsApp + browser) · physician-reviewed',
  },
  {
    label: 'Price anchor',
    course: '$349',
    us: '{{PRICE}}',
  },
]

export default function NotACourse() {
  return (
    <motion.section
      className="py-24 md:py-32 px-6 bg-bone"
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={staggerContainer}
    >
      <div className="max-w-4xl mx-auto">
        <motion.h2
          variants={fadeInUp}
          className="font-display text-display-xl text-forest text-center mb-4"
        >
          This is not a course.
          <br />
          <span className="italic text-coral">It's a conversation.</span>
        </motion.h2>

        <motion.p
          variants={fadeInUp}
          className="text-body-md text-slate text-center max-w-[560px] mx-auto mb-14"
        >
          Courses are monologues. This is a dialogue — with Shilpa, with your cohort, with your
          own labs and story at the center.
        </motion.p>

        {/* Comparison table */}
        <motion.div variants={fadeInUp} className="rounded-2xl border border-border overflow-hidden bg-cream">
          <div className="grid grid-cols-[1fr_1.3fr_1.3fr] bg-sand/60 border-b border-border">
            <div className="p-4 md:p-5" />
            <div className="p-4 md:p-5 border-l border-border">
              <div className="font-mono text-[10px] text-slate tracking-widest uppercase mb-1">
                Typical online course
              </div>
              <div className="text-[14px] text-slate">e.g., Stacy Sims Menopause 2.0</div>
            </div>
            <div className="p-4 md:p-5 border-l border-border bg-forest text-cream">
              <div className="font-mono text-[10px] text-coral-soft tracking-widest uppercase mb-1">
                Shilpa Method
              </div>
              <div className="text-[14px] text-cream">Boot Camp</div>
            </div>
          </div>

          {ROWS.map((row, i) => (
            <div
              key={row.label}
              className={`grid grid-cols-[1fr_1.3fr_1.3fr] ${i !== ROWS.length - 1 ? 'border-b border-border' : ''}`}
            >
              <div className="p-4 md:p-5 font-mono text-[10px] text-slate tracking-widest uppercase self-center">
                {row.label}
              </div>
              <div className="p-4 md:p-5 border-l border-border text-[14px] text-slate">
                {row.course}
              </div>
              <div className="p-4 md:p-5 border-l border-border text-[14px] text-forest font-medium bg-sand/30">
                {row.us}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}
