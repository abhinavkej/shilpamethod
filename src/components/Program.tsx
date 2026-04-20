import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, viewportConfig } from '../lib/motion'

const DAYS = [
  {
    day: 'Day 1 · Tuesday',
    theme: 'Define Needs',
    blurb:
      'Map what your body is actually telling you. Your symptom pattern, your timeline, your family history — against the hormonal shifts happening underneath.',
  },
  {
    day: 'Day 2 · Wednesday',
    theme: 'Calculate Risks',
    blurb:
      'The four risk axes — clotting, cancer, cardiovascular, bone — and the labs that map each one. How to read your own bloodwork like an endocrinologist.',
  },
  {
    day: 'Day 3 · Thursday',
    theme: 'Create Solutions',
    blurb:
      'Translate your needs + your risk profile into a personalized Patient Advocacy Document. The specific questions, labs, and next steps you walk into your next appointment with.',
  },
]

export default function Program() {
  return (
    <motion.section
      id="program"
      className="py-24 md:py-36 px-6 bg-cream"
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={staggerContainer}
    >
      <div className="max-w-6xl mx-auto">
        <motion.p variants={fadeInUp} className="text-label text-coral uppercase text-center mb-5">
          How it works
        </motion.p>

        <motion.h2
          variants={fadeInUp}
          className="font-display text-display-xl text-forest text-center mb-4"
        >
          Three days. One conversation. <br className="hidden md:block" />
          <span className="italic">Your own document at the end.</span>
        </motion.h2>

        <motion.p
          variants={fadeInUp}
          className="text-body-md text-slate text-center max-w-[580px] mx-auto mb-16"
        >
          Live on Zoom. Small cohorts. Two-way every session — no pre-recorded lecture camouflaged as a live class.
        </motion.p>

        {/* Day cards */}
        <motion.div variants={fadeInUp} className="grid md:grid-cols-3 gap-5 mb-16">
          {DAYS.map((d, i) => (
            <div key={d.day} className="bg-bone border border-border rounded-2xl p-7">
              <div className="flex items-baseline justify-between mb-4">
                <span className="font-mono text-[10px] text-coral tracking-widest uppercase">
                  {d.day}
                </span>
                <span className="font-display text-[32px] text-forest/20">0{i + 1}</span>
              </div>
              <h3 className="font-display text-[26px] text-forest mb-3 leading-tight">
                {d.theme}
              </h3>
              <p className="text-body-sm text-slate leading-relaxed">{d.blurb}</p>
            </div>
          ))}
        </motion.div>

        {/* Session mechanics */}
        <motion.div
          variants={fadeInUp}
          className="bg-forest text-cream rounded-2xl px-7 md:px-10 py-8 md:py-10"
        >
          <div className="grid md:grid-cols-[1fr_2fr] gap-6 items-center">
            <div>
              <div className="font-mono text-[10px] text-coral-soft tracking-widest uppercase mb-2">
                Session mechanics
              </div>
              <div className="font-display text-[36px] md:text-[44px] leading-none">
                75 min
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 md:gap-6">
              <Mechanic n="25" label="min" sub="Shilpa teaching" />
              <Mechanic n="50" label="min" sub="Live Q&A + workshop" />
              <Mechanic n="Zoom" label="" sub="Live, two-way" isText />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}

function Mechanic({ n, label, sub, isText }: { n: string; label: string; sub: string; isText?: boolean }) {
  return (
    <div className="border-l border-cream/20 pl-4">
      <div className="flex items-baseline gap-1.5">
        <span className={isText ? 'font-display text-[22px]' : 'font-display text-[32px]'}>{n}</span>
        {label && <span className="font-mono text-[11px] text-cream/60 uppercase">{label}</span>}
      </div>
      <div className="text-[13px] text-cream/70 mt-0.5">{sub}</div>
    </div>
  )
}
