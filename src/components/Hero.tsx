import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '../lib/motion'
import { SHILPA_HEADSHOT_URL } from '../config/placeholders'

export default function Hero() {
  const scroll = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <motion.section
      className="min-h-[92vh] flex items-center justify-center px-6 pt-20 pb-16 relative overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      {/* Background wash */}
      <div className="absolute inset-0 bg-gradient-to-b from-sand/40 via-cream to-cream pointer-events-none" aria-hidden />

      <div className="max-w-[760px] text-center relative">
        <motion.p
          variants={fadeInUp}
          className="text-label text-coral uppercase mb-8"
        >
          A LIVE 3-DAY BOOT CAMP · PERIMENOPAUSE &amp; MENOPAUSE
        </motion.p>

        <motion.h1
          variants={fadeInUp}
          className="font-display text-hero text-forest mb-7"
        >
          Your body has been trying to tell you something.
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          className="text-body-lg text-slate max-w-[620px] mx-auto mb-10"
        >
          Three live group sessions with Dr. Shilpa Saxena, MD — a board-certified Family Practice physician. You leave with a personalized Patient Advocacy Document built for a more productive conversation with your doctor. It is time to take control of your health and happiness.
        </motion.p>

        <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => scroll('registration')}
            className="bg-forest text-cream text-[16px] px-7 py-3.5 rounded-full hover:bg-ivy transition-colors"
          >
            Reserve your spot
          </button>
          <button
            onClick={() => scroll('document')}
            className="text-forest text-[16px] px-5 py-3.5 hover:text-ivy transition-colors underline-offset-4 hover:underline"
          >
            See what you walk away with →
          </button>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          className="flex items-center justify-center gap-4 mt-14"
        >
          <img
            src={SHILPA_HEADSHOT_URL}
            alt="Dr. Shilpa Saxena"
            className="w-14 h-14 rounded-full object-cover"
            style={{ objectPosition: 'center 20%' }}
          />
          <div className="text-left">
            <div className="text-[15px] font-medium text-forest">Dr. Shilpa Saxena, MD</div>
            <div className="text-label text-slate uppercase">Board-Certified · IFM Faculty · Forum Health CMO</div>
          </div>
        </motion.div>

        {/* Floating quote card */}
        <motion.div
          variants={fadeInUp}
          className="hidden md:block absolute -right-8 top-6 rotate-[3deg] bg-white border border-border rounded-2xl px-5 py-4 max-w-[260px] text-left"
          style={{ boxShadow: '0 12px 40px rgba(31,58,46,0.08)' }}
        >
          <div className="text-label text-coral uppercase mb-2">LIVE · TWO-WAY</div>
          <div className="font-display text-[18px] text-forest italic leading-snug">
            "A personalized program to help you understand your lifestyle and medication options."
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
