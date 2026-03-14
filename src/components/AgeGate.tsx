import { motion } from 'framer-motion'
import { useApp, AGE_LABELS, AGE_SUBLABELS, type AgeRange } from '../context/AppContext'
import { fadeInUp, staggerContainer } from '../lib/motion'

const ageRanges: AgeRange[] = ['late-30s', 'early-40s', 'mid-40s', 'early-50s']

export default function AgeGate() {
  const { state, dispatch } = useApp()

  if (state.ageGateCompleted) return null

  return (
    <motion.section
      className="min-h-[90vh] flex items-center justify-center px-6 pt-20"
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, y: -12, transition: { duration: 0.3 } }}
      variants={staggerContainer}
    >
      <div className="max-w-[560px] w-full text-center">
        <motion.div
          variants={fadeInUp}
          className="font-mono text-[11px] text-gold tracking-[2px] uppercase mb-6"
        >
          THE SHILPA METHOD &middot; MARCH 28–29, 2026
        </motion.div>

        <motion.h1
          variants={fadeInUp}
          className="font-display text-[38px] md:text-[58px] font-light text-deep leading-[1.15] mb-4"
        >
          Your body has been trying to tell you something.
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          className="font-body text-[18px] text-muted max-w-[440px] mx-auto leading-[1.65] mb-10"
        >
          Select your age to see what's actually happening — and what you can do about it.
        </motion.p>

        <motion.div variants={fadeInUp} className="grid grid-cols-2 gap-3 max-w-[400px] mx-auto">
          {ageRanges.map((range) => (
            <motion.button
              key={range}
              whileTap={{ scale: 0.97 }}
              whileHover={{ backgroundColor: '#EAF4ED', borderColor: '#4A7A5C' }}
              onClick={() => dispatch({ type: 'SET_AGE_RANGE', payload: range })}
              className="h-14 rounded-full border-[1.5px] border-border bg-white font-body text-[16px] text-warm cursor-pointer transition-colors"
            >
              {AGE_LABELS[range]} — {AGE_SUBLABELS[range]}
            </motion.button>
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}
