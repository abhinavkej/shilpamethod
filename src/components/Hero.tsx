import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '../lib/motion'

export default function Hero() {
  return (
    <motion.section
      id="hero"
      className="min-h-[92vh] flex items-center px-6 pt-28 pb-16 bg-cream relative overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      {/* Subtle geometric accent */}
      <div
        aria-hidden
        className="absolute right-[-10%] top-[10%] w-[480px] h-[480px] rounded-full opacity-[0.08] blur-3xl"
        style={{ background: 'radial-gradient(circle, #D97757 0%, transparent 70%)' }}
      />
      <div
        aria-hidden
        className="absolute left-[-15%] bottom-[5%] w-[560px] h-[560px] rounded-full opacity-[0.10] blur-3xl"
        style={{ background: 'radial-gradient(circle, #2D5445 0%, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto grid md:grid-cols-[1.2fr_0.8fr] gap-12 items-center relative z-10">
        <div>
          <motion.p
            variants={fadeInUp}
            className="text-label text-coral uppercase mb-6"
          >
            A LIVE 3-DAY BOOT CAMP · PERIMENOPAUSE & MENOPAUSE
          </motion.p>

          <motion.h1
            variants={fadeInUp}
            className="font-display text-hero text-forest mb-8"
          >
            Your body has been trying to tell you something.
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="font-sans text-body-lg text-slate max-w-[540px] mb-10"
          >
            Three live sessions with Dr. Shilpa Saxena, MD — a board-certified lipidologist. You leave with a personalized Patient Advocacy Document built for the conversation your doctor never had time for.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap items-center gap-4 mb-10"
          >
            <button
              onClick={() => document.getElementById('registration')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-forest text-cream text-[16px] px-7 py-3.5 rounded-full hover:bg-ivy transition-colors"
            >
              Reserve your spot
            </button>
            <button
              onClick={() => document.getElementById('document')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-[16px] text-forest underline underline-offset-4 decoration-border hover:decoration-forest transition-colors"
            >
              See what you walk away with →
            </button>
          </motion.div>

          <motion.div variants={fadeInUp} className="flex items-center gap-4 pt-6 border-t border-border/60 max-w-md">
            <img
              src="https://forumhealth.com/wp-content/uploads/2019/05/Shilpa-Saxena-1-scaled-e1699545138555-768x768.webp"
              alt="Dr. Shilpa Saxena"
              className="w-14 h-14 rounded-full object-cover"
              style={{ objectPosition: 'center 20%' }}
            />
            <div className="text-left">
              <div className="text-[15px] font-medium text-forest">Dr. Shilpa Saxena, MD</div>
              <div className="font-mono text-[10px] text-slate tracking-widest uppercase">
                Board-Certified · IFM Faculty · Forum Health CMO
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div variants={fadeInUp} className="relative hidden md:block">
          <div className="aspect-[4/5] rounded-[28px] overflow-hidden relative">
            <img
              src="https://forumhealth.com/wp-content/uploads/2019/05/Shilpa-Saxena-1-scaled-e1699545138555-768x768.webp"
              alt="Dr. Shilpa Saxena"
              className="w-full h-full object-cover"
              style={{ objectPosition: 'center 15%' }}
            />
          </div>
          <div className="absolute -bottom-5 -left-5 bg-cream border border-border rounded-2xl px-5 py-4 max-w-[240px]" style={{ boxShadow: '0 8px 32px rgba(31,58,46,0.12)' }}>
            <div className="font-mono text-[10px] text-coral tracking-widest uppercase mb-1">Live · Two-way</div>
            <div className="text-[14px] text-forest leading-snug">
              "This is not a course. It's a conversation."
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
