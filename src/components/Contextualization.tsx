import { motion } from 'framer-motion'
import { useApp, AGE_LABELS } from '../context/AppContext'
import { fadeInUp, staggerContainer, viewportConfig } from '../lib/motion'
import { ageContextText } from '../data/ageText'

export default function Contextualization() {
  const { state } = useApp()

  if (!state.ageRange) return null

  return (
    <motion.section
      className="bg-cream py-12 md:py-20 px-6"
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={staggerContainer}
    >
      <div className="max-w-[680px] mx-auto">
        <motion.div
          variants={fadeInUp}
          className="font-mono text-[11px] text-gold tracking-[2px] uppercase mb-4"
        >
          WOMEN IN THEIR {AGE_LABELS[state.ageRange].toUpperCase()}
        </motion.div>

        <motion.h2
          variants={fadeInUp}
          className="font-display text-[32px] md:text-[44px] font-light text-deep leading-[1.2] mb-6"
        >
          What you're experiencing has a name. And a reason. And a solution.
        </motion.h2>

        <motion.p
          variants={fadeInUp}
          className="font-body text-[17px] text-muted leading-[1.75] mb-8"
        >
          {ageContextText[state.ageRange]}
        </motion.p>

        <motion.hr variants={fadeInUp} className="border-border border-t-[0.5px] mb-6" />

        <motion.div
          variants={fadeInUp}
          className="font-mono text-[12px] text-gold tracking-[1.5px] text-center"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          SELECT THE SYMPTOMS YOU'VE NOTICED &darr;
        </motion.div>
      </div>
    </motion.section>
  )
}
