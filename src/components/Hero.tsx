import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '../lib/motion'

export default function Hero() {
  return (
    <motion.section
      className="min-h-[90vh] flex items-center justify-center px-6 pt-20"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      <div className="max-w-[560px] text-center">
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
          className="font-body text-[18px] text-muted max-w-[440px] mx-auto leading-[1.65]"
        >
          A 2-day program with Dr. Shilpa Saxena — the education your doctor never gave you, so you
          can make informed decisions about your hormonal health.
        </motion.p>

        <motion.div variants={fadeInUp} className="mt-8">
          <button
            onClick={() =>
              document.getElementById('symptoms')?.scrollIntoView({ behavior: 'smooth' })
            }
            className="font-body text-[15px] text-sage hover:text-deep transition-colors cursor-pointer"
          >
            Start with your symptoms &darr;
          </button>
        </motion.div>
      </div>
    </motion.section>
  )
}
