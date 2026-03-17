import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '../lib/motion'

export default function Hero() {
  return (
    <motion.section
      className="min-h-[70vh] flex items-center justify-center px-6 pt-20"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      <div className="max-w-[560px] text-center">
        <motion.div
          variants={fadeInUp}
          className="font-mono text-[11px] text-gold tracking-[2px] uppercase mb-6"
        >
          THE HORMONE METHOD &middot; MARCH 28–29, 2026
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
          A 2-day program with Dr. Shilpa Saxena &amp; Dr. Tara Scott — the education your doctor never gave you, so you
          can make informed decisions about your hormonal health.
        </motion.p>

        {/* Two-person byline strip */}
        <motion.div
          variants={fadeInUp}
          className="flex items-center justify-center gap-4 mt-8"
        >
          <div className="flex items-center gap-2.5">
            <img
              src="https://forumhealth.com/wp-content/uploads/2019/05/Shilpa-Saxena-1-scaled-e1699545138555-768x768.webp"
              alt="Dr. Shilpa Saxena"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="text-left">
              <div className="font-body text-[13px] text-deep font-medium">Dr. Shilpa Saxena</div>
              <div className="font-mono text-[9px] text-warm tracking-[1px]">FUNCTIONAL MEDICINE</div>
            </div>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="flex items-center gap-2.5">
            <img
              src="/tara-scott.png"
              alt="Dr. Tara Scott"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="text-left">
              <div className="font-body text-[13px] text-deep font-medium">Dr. Tara Scott</div>
              <div className="font-mono text-[9px] text-warm tracking-[1px]">HORMONE SPECIALIST</div>
            </div>
          </div>
        </motion.div>

      </div>
    </motion.section>
  )
}
